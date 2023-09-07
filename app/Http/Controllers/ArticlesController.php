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
    //TOPページ表示
    public function top()
    {
        // 投稿された記事を全て取得
        $articles = Article::with('user')->orderBy('updated_at', 'DESC')->paginate(5);
        // dd($articles->items());

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

    // 記事の新規投稿
    public function create()
    {
        return Inertia::render('create');
    }

    // 記事の保存処理
    public function store(BlogRequest $request)
    {
        // バリデーションを通過したら記事を保存
        $article = new Article;
        $article->title = $request->title;
        $article->period_start = $request->period_start;
        $article->period_end = $request->period_end;
        $article->description = $request->description;
        $article->user_id = Auth::id();
        $article->save();
        return to_route('show', ['article' => $article->id]);
    }

    // 投稿した記事の編集
    public function edit(Article $article)
    {
        // Articleインスタンスから記事を取得。
        return Inertia::render('edit', [
            'article' => $article,
        ]);

    }

    // 投稿した記事の更新
    public function update(BlogRequest $request, Article $article)
    {
        // バリデーションを通過したら記事を更新
        $article->title = $request->title;
        $article->period_start = $request->period_start;
        $article->period_end = $request->period_end;
        $article->description = $request->description;
        $article->save();
        return to_route('show', ['article' => $article->id]);
    }

    // 投稿した記事の削除
    public function destroy(Article $article)
    {
        // 記事を物理削除
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