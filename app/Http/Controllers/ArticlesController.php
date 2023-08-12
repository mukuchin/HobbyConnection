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


class ArticlesController extends Controller
{
    //TOPページ表示
    public function top(Article $article)
    {
        // top.tsxに取得したデータを渡す
        return Inertia::render('top', [
            'articles' => $article->getPaginateByLimit(5)
        ]);
    }

    // マイページ
    public function mypage(Article $article)
    {
        // mypage.tsxに取得したデータを渡す
        return Inertia::render('mypage', [
            'articles' => $article->getPaginateByLimit(5)
        ]);
    }

    // 記事の新規投稿
    public function create(Tag $tag, Article $article, Post $post)
    {
        // create.tsxを表示
        return Inertia::render('create', [
            // 'tags' => $tag->all(),
            'articles' => $article->all(),
            // 'posts' => $post->all()
        ]);
    }

    // 記事の保存処理
    public function store(BlogRequest $request, Article $article)
    {
        
    }

    // 投稿した記事の編集
    public function edit(Article $article)
    {
        // edit.tsxに取得したデータを渡す
        return Inertia::render('edit', [
            'article' => $article
        ]);
    }

    // 投稿した記事の更新
    public function update(BlogRequest $request, Article $article)
    {
        // リクエストの内容を取得
        $inputs = $request->all();

        // リクエストの内容を保存
        $article->fill($inputs)->save();

        // 記事のタグを保存
        $article->tags()->sync($request->tags);

        // 記事のIDを取得
        $article_id = $article->id;

        return redirect()->route('show', ['article' => $article_id]);
    }

    // 投稿した記事の削除
    public function delete(Article $article)
    {
        // 記事のIDを取得
        $article_id = $article->id;

        // 記事の削除
        $article->delete();

        return redirect()->route('top');
    }

    // 記事の閲覧
    public function show(Article $article)
    {
        // show.tsxに取得したデータを渡す
        return Inertia::render('show', [
            'article' => $article
        ]);
    }
}