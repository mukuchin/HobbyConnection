<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Auth;
use App\Models\Article;
use App\Models\Post;
use App\Models\User;
use App\Models\Tag;
use App\Http\Requests\BlogRequest;
use Illuminate\Support\Facades\Storage;

class ArticlesController extends Controller
{
    // TOPページ
    public function top()
    {
        $articles = Article::with('user')->latest('updated_at')->paginate(5);
        foreach ($articles as $article) {
            $article['tags'] = $article->tags()->pluck('name');
        }
        return Inertia::render('top', [
            'article' => $articles,
            'paginationInfo' => [
                'total' => $articles->total(),
                'perPage' => $articles->perPage(),
                'currentPage' => $articles->currentPage(),
            ]
        ]);
    }

    // マイページ
    public function mypage()
    {
        $articles = Article::with('user')->where('user_id', Auth::id())->latest('updated_at')->paginate(5);
        foreach ($articles as $article) {
            $article['tags'] = $article->tags()->pluck('name');
        }
        return Inertia::render('mypage', [
            'article' => $articles,
            'paginationInfo' => [
                'total' => $articles->total(),
                'perPage' => $articles->perPage(),
                'currentPage' => $articles->currentPage(),
            ]
        ]);
    }

    // 記事投稿ページ
    public function create()
    {
        return Inertia::render('create');
    }

    // 記事の保存処理
    public function store(BlogRequest $request)
    {
        $article = $this->saveArticle($request);
        $this->savePosts($request->sub_form_data, $article->id);
        return redirect()->route('show', ['article' => $article->id]);
    }

    // 記事編集ページ
    public function edit(Article $article)
    {
        $article['sub_form_data'] = $this->getArticleWithPosts($article);
        $article['tags'] = $article->tags()->pluck('name');
        return Inertia::render('edit', ['article' => $article]);
    }

    // 記事の更新処理
    public function update(BlogRequest $request, Article $article)
    {
        $this->updateArticle($request, $article);
        $this->updatePosts($request->sub_form_data, $article->id);
        return redirect()->route('show', ['article' => $article->id]);
    }

    // 記事の削除処理
    public function destroy(Article $article)
    {
        // Articleのメイン画像を削除
        if ($article->image_top) {
            Storage::disk('s3')->delete($article->image_top);
        }

        // 該当のArticleに関連するすべてのPostの画像を削除
        foreach ($article->posts as $post) {
            if ($post->image) {
                Storage::disk('s3')->delete($post->image);
            }
        }

        // Article自体を削除
        $article->forceDelete();

        // article_tagテーブル、tagテーブルから不要なタグを削除
        $tags = Tag::all();
        foreach ($tags as $tag) {
            if ($tag->articles()->count() === 0) {
                $tag->delete();
            }
        }
    }


    // 記事の閲覧ページ
    public function show(Article $article)
    {
        $article['sub_form_data'] = $this->getArticleWithPosts($article);
        $article['tags'] = $article->tags()->pluck('name');
        $user = User::find($article->user_id);
        return Inertia::render('show', ['article' => $article, 'article_user' => $user]);
    }

    // ------------------------------
    // 以下、privateメソッド
    // ------------------------------

    // メインフォームの保存処理
    private function saveArticle($request)
    {
        $article = new Article;
        $article->fill([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'period_start' => $request->period_start,
            'period_end' => $request->period_end,
            'description' => $request->description,
        ]);

        // 画像の保存処理
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('top_images', 's3');
            $article->image_top = $path;
        }
        $article->save();

        // タグの保存処理。タグは配列で受け取る。
        // タグが設定された場合のみ保存
        if ($request->tags) {
            foreach ($request->tags as $tag) {
                if (!empty($tag)) {
                    $tag = Tag::firstOrCreate(['name' => $tag]);
                    $article->tags()->attach($tag);
                }
            }
        }
        return $article;
    }

    // メインフォームの更新処理
    private function updateArticle($request, $article)
    {
        $article->fill([
            'title' => $request->title,
            'period_start' => $request->period_start,
            'period_end' => $request->period_end,
            'description' => $request->description,
        ]);
        if ($request->hasFile('image')) {
            if ($article->image_top) {
                Storage::disk('s3')->delete($article->image_top);
            }
            $path = $request->file('image')->store('top_images', 's3');
            $article->image_top = $path;
        } elseif ($request->input('delete_image') === 'true') {
            Storage::disk('s3')->delete($article->image_top);
            $article->image_top = null;
        }
        $article->save();

        // タグの更新処理。タグは配列で受け取る。
        // 既存のタグを削除
        $article->tags()->detach();
        // 新しいタグを保存
        if ($request->tags) {
            foreach ($request->tags as $tag) {
                if ($tag) {
                    $tag = Tag::firstOrCreate(['name' => $tag]);
                    $article->tags()->attach($tag);
                }
            }
        }
        // article_tagテーブルから不要なタグを削除
        $tags = Tag::all();
        foreach ($tags as $tag) {
            if ($tag->articles()->count() === 0) {
                $tag->delete();
            }
        }
    }

    // サブフォームの保存処理
    private function savePosts($subFormData, $articleId)
    {
        if ($subFormData && is_array($subFormData)) {
            foreach ($subFormData as $data) {
                dd($data);
                if (
                    isset($data['heading']) || isset($data['comment']) || isset($data['image'])
                ) {
                    $post = new Post;
                    $post->fill([
                        'user_id' => Auth::id(),
                        'article_id' => $articleId,
                        'heading' => $data['heading'],
                        'comment' => $data['comment'],
                    ]);
                    if (isset($data['image']) && $data['image'] instanceof \Illuminate\Http\UploadedFile) {
                        $path = $data['image']->store('post_images', 's3');
                        $post->image = $path;
                    }
                    $post->save();
                }
            }
        }
    }


    // サブフォームの更新処理
    private function updatePosts($subFormData, $articleId)
    {
        $existingPostIds = Post::where('article_id', $articleId)->pluck('id')->toArray();
        foreach ($subFormData as $data) {
            $post = Post::find($data['id']);
            // 既存のデータを更新
            // 画像またはコメントまたは見出しが既に存在する場合
            if (
                Post::where('id', $data['id'])->where(function ($query) {
                    $query->whereNotNull('image')->orWhereNotNull('comment')->orWhereNotNull('heading');
                })->exists()
            ) {
                // 画像が新たに選択されている場合
                if (isset($data['image'])) {
                    // 画像のアップロード処理
                    if (isset($data['image'])) {
                        if ($post->image) {
                            Storage::disk('s3')->delete($post->image);
                        }
                        $path = $data['image']->store('post_images', 's3');
                        $post->image = $path;
                    }
                }
                // 画像を削除する場合
                elseif (isset($data['delete_image']) && $data['delete_image'] === 'true') {
                    Storage::disk('s3')->delete($post->image);
                    $post->image = null;
                }
                // 見出しが既存のものと異なる場合
                if ($data['heading'] !== Post::find($data['id'])->heading) {
                    $post->fill([
                        'heading' => $data['heading']
                    ]);
                }
                // コメントが既存のものと異なる場合
                if ($data['comment'] !== Post::find($data['id'])->comment) {
                    $post->fill([
                        'comment' => $data['comment']
                    ]);
                }
                $post->save();

                // 更新されたPostのIDを配列から削除
                $index = array_search($data['id'], $existingPostIds);
                if ($index !== false) {
                    unset($existingPostIds[$index]);
                }
            }
            // 既存のデータが存在しない場合
            else {
                // 新しいデータを挿入
                $post = new Post;
                $post->fill([
                    'user_id' => Auth::id(),
                    'article_id' => $articleId,
                    'heading' => $data['heading'],
                    'comment' => $data['comment'],
                ]);

                // 画像のアップロード処理
                if (isset($data['image'])) {
                    $path = $data['image']->store('post_images', 's3');
                    $post->image = $path;
                }

                $post->save();
            }
        }

        // 不要なPostを削除
        Post::whereIn('id', $existingPostIds)->delete();
    }

    // メインフォームとサブフォームのデータを結合
    private function getArticleWithPosts($article)
    {
        $articleWithPosts = [];
        foreach ($article->posts as $post) {
            $articleWithPosts[] = [
                'id' => $post->id,
                'heading' => $post->heading,
                'comment' => $post->comment,
                'image' => $post->image,
            ];
        }
        return empty($articleWithPosts) ? [''] : $articleWithPosts;
    }
}