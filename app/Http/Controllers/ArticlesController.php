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
        // バリデーションを通過したらメインフォームとサブフォームを保存
        $article = new Article;
        $article->user_id = Auth::id();
        $article->title = $request->title;
        $article->period_start = $request->period_start;
        $article->period_end = $request->period_end;
        $article->description = $request->description;
        $article->save();

        // サブフォームのデータをpostsテーブルに保存
        foreach ($request->sub_form_data as $index => $data) {
            if (!empty($data)) {  // サブフォームの入力が空でない場合のみ保存
                $post = new Post;
                $post->user_id = Auth::id();
                $post->article_id = $article->id;
                $post->comment = $data;
                $post->post_num = $index + 1;
                $post->save();
            }
        }

        return to_route('show', ['article' => $article->id]);
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
        // バリデーションを通過したらメインフォームを更新
        $article->title = $request->title;
        $article->period_start = $request->period_start;
        $article->period_end = $request->period_end;
        $article->description = $request->description;
        $article->save();

        // postsテーブルのデータを削除
        Post::where('article_id', $article->id)->delete();

        // サブフォームのデータをpostsテーブルに保存
        foreach ($request->sub_form_data as $index => $data) {
            // サブフォームの入力が空でない場合のみ保存
            if (!empty($data)) { 
                $post = new Post;
                $post->user_id = Auth::id();
                $post->article_id = $article->id;
                $post->comment = $data;
                $post->post_num = $index + 1;
                $post->save();
            }
        }

        return to_route('show', ['article' => $article->id]);
    }

    // 投稿した記事の削除
    public function destroy(Article $article)
    {
        $article->forceDelete();
    }

    // 記事の閲覧
    public function show(Article $article)
    {
        // ユーザーIDからユーザー名を取得
        $user = User::where('id', $article->user_id)->first();
        return Inertia::render('show', [
            'article' => $article,
            'article_user' => $user,
        ]);
    }
}