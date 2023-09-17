<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Auth;
use Illuminate\Support\Facades\Route;
use App\Models\Article;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use App\Http\Requests\BlogRequest;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ArticlesController extends Controller
{
    //TOPページ
    public function top()
    {
        // 投稿された記事を全て取得
        $articles = Article::with('user')->orderBy('updated_at', 'DESC')->paginate(5);

        return Inertia::render('top', [
            'article' => $articles,
        ]);
    }

    // マイページ
    public function mypage()
    {   
        // 自分が投稿した記事を全て取得
        $articles = Article::with('user')->where('user_id', Auth::id())->orderBy('updated_at', 'DESC')->paginate(5);

        return Inertia::render('mypage', [
            'article' => $articles,
        ]);
    }

    // 記事投稿ページ
    public function create()
    {
        return Inertia::render('create');
    }

    // 記事の保存
    public function store(BlogRequest $request)
    {
        // sub_form_data の内容を確認
        $subFormData = $request->sub_form_data;
        \Log::info('Sub form data:', ['data' => $request->sub_form_data]);

        if (is_string($subFormData)) {
            $subFormData = json_decode($subFormData, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                \Log::error('JSON decode error:', ['error' => json_last_error_msg()]);
            }
        }

        // バリデーションを通過したらメインフォームとサブフォームを保存
        $article = new Article;
        $article->user_id = Auth::id();
        $article->title = $request->title;
        $article->period_start = $request->period_start;
        $article->period_end = $request->period_end;
        $article->description = $request->description;
        // Amazon S3のバケットに画像を保存。ただし、画像がない場合は保存しない。
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('top_images', 's3');
            $article->image_top = $path;
        }
        $article->save();

        // サブフォームのデータをpostsテーブルに保存
        if ($subFormData && is_array($subFormData)) {
            foreach ($subFormData as $index => $data) {
                if (!empty($data)) {  // サブフォームの入力が空でない場合のみ保存
                    $post = new Post;
                    $post->user_id = Auth::id();
                    $post->article_id = $article->id;
                    $post->comment = $data;
                    $post->post_num = $index + 1;
                    $post->save();
                }
            }
        } else {
            \Log::warning('Sub form data is not an array or is empty.');
        }

        return redirect()->route('show', ['article' => $article->id]);
    }
    
    // 記事編集ページ
    public function edit(Article $article)
    {
        // Articleインスタンスから記事と関連するPostデータを取得。
        foreach ($article->posts as $post) {
            $articleWithPosts[] = $post->comment;
        }

        // サブフォームのデータが空の場合、空の配列を代入。
        if (empty($articleWithPosts)) {
            $articleWithPosts[] = '';
        }
        $article['sub_form_data'] = $articleWithPosts;

        // Articleインスタンスから記事を取得。
        return Inertia::render('edit', [
            'article' => $article
        ]);

    }

    // 投稿した記事の更新
    public function update(BlogRequest $request, Article $article)
    {
        // sub_form_data の内容を確認
        $subFormData = $request->sub_form_data;
        if (is_string($subFormData)) {
            $subFormData = json_decode($subFormData, true);
        }
        // $requestDataにリクエストパラメータを代入
        $requestData = $request->all();

        // バリデーションを通過したらメインフォームを更新
        $article->title = $requestData['title'];
        $article->period_start = $requestData['period_start'];
        $article->period_end = $requestData['period_end'];
        $article->description = $requestData['description'];
         // Amazon S3のバケットに画像を保存。ただし、画像がない場合は一度保存した画像を削除。
        if ($request->hasFile('image')) {
            Storage::disk('s3')->delete($article->image_top); // S3から画像を削除
            $path = $request->file('image')->store('top_images', 's3');
            $article->image_top = $path;
        }
        $article->save();

        // postsテーブルのデータを削除
        Post::where('article_id', $article->id)->delete();

        // サブフォームのデータをpostsテーブルに保存
        if ($subFormData && is_array($subFormData)) {
            foreach ($subFormData as $index => $data) {
                if (!empty($data)) {
                    $post = new Post;
                    $post->user_id = Auth::id();
                    $post->article_id = $article->id;
                    $post->comment = $data;
                    $post->post_num = $index + 1;
                    $post->save();
                }
            }
        }        

        return redirect()->route('show', ['article' => $article->id]);
    }

    // 投稿した記事の削除
    public function destroy(Article $article)
    {
        $article->forceDelete();
    }

    // 記事の閲覧
    public function show(Article $article)
    {
        // Articleインスタンスから記事と関連するPostデータを取得。
        foreach ($article->posts as $post) {
            $articleWithPosts[] = $post->comment;
        }

        // サブフォームのデータが空の場合、空の配列を代入。
        if (empty($articleWithPosts)) {
            $articleWithPosts[] = '';
        }
        $article['sub_form_data'] = $articleWithPosts;

        // ユーザー名を取得
        $user = User::where('id', $article->user_id)->first();
        return Inertia::render('show', [
            'article' => $article,
            'article_user' => $user,
        ]);
    }
}