<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;
use App\Models\Article;
use App\Models\Post;
use App\Models\User;
use App\Http\Requests\BlogRequest;

class ArticlesController extends Controller
{
    //TOPページ
    public function top()
    {
        $articles = Article::with('user')->orderBy('updated_at', 'DESC')->paginate(5);
        return Inertia::render('top', ['article' => $articles]);
    }

    // マイページ
    public function mypage()
    {
        $articles = Article::with('user')->where('user_id', Auth::id())->orderBy('updated_at', 'DESC')->paginate(5);
        return Inertia::render('mypage', ['article' => $articles]);
    }

    // 記事投稿ページ
    public function create()
    {
        return Inertia::render('create');
    }

    // 記事の保存
    public function store(BlogRequest $request)
    {
        $subFormData = $this->getSubFormData($request->sub_form_data);
        $article = $this->saveArticle($request);
        $this->savePosts($subFormData, $article->id);
        return redirect()->route('show', ['article' => $article->id]);
    }

    // 記事編集ページ
    public function edit(Article $article)
    {
        $article['sub_form_data'] = $this->getArticleWithPosts($article);
        return Inertia::render('edit', ['article' => $article]);
    }

    // 投稿した記事の更新
    public function update(BlogRequest $request, Article $article)
    {
        $subFormData = $this->getSubFormData($request->sub_form_data);
        $this->updateArticle($request, $article);
        $this->savePosts($subFormData, $article->id);
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
        $article['sub_form_data'] = $this->getArticleWithPosts($article);
        $user = User::where('id', $article->user_id)->first();
        return Inertia::render('show', ['article' => $article, 'article_user' => $user]);
    }

    //-------------------------------------------------
    // 以下、プライベートメソッド
    //-------------------------------------------------
    
    // サブフォームのデータを取得
    private function getSubFormData($subFormData)
    {
        if (is_string($subFormData)) {
            $subFormData = json_decode($subFormData, true);
        }
        return $subFormData;
    }

    // 記事を保存
    private function saveArticle($request)
    {
        $article = new Article;
        $article->fill([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'period_start' => $request->period_start,
            'period_end' => $request->period_end,
            'description' => $request->description,
            'image_top' => $request->hasFile('image') ? $request->file('image')->store('top_images', 's3') : null,
        ]);
        $article->save();
        return $article;
    }

    // 記事を更新
    private function updateArticle($request, $article)
    {
        $article->update([
            'title' => $request->title,
            'period_start' => $request->period_start,
            'period_end' => $request->period_end,
            'description' => $request->description,
            'image_top' => $request->hasFile('image') ? $request->file('image')->store('top_images', 's3') : null,
        ]);
    }

    // コメントを保存
    private function savePosts($subFormData, $articleId)
    {
        Post::where('article_id', $articleId)->delete();
        if ($subFormData && is_array($subFormData)) {
            foreach ($subFormData as $index => $data) {
                if (!empty($data)) {
                    $post = new Post;
                    $post->fill([
                        'user_id' => Auth::id(),
                        'article_id' => $articleId,
                        'comment' => $data,
                        'post_num' => $index + 1,
                    ]);
                    $post->save();
                }
            }
        }
    }

    // 記事に紐づくサブフォームのデータを取得
    private function getArticleWithPosts($article)
    {
        $articleWithPosts = [];
        foreach ($article->posts as $post) {
            $articleWithPosts[] = $post->comment;
        }
        return $articleWithPosts;
    }
}
