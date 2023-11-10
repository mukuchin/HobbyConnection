<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ArticlesController;
use Illuminate\Support\Facades\Route;

// ログイン時のみアクセスできるルート
Route::middleware('auth')->group(function () {
    Route::get('/mypage', [ArticlesController::class, 'mypage'])->name('mypage'); // マイページ

    // 記事の新規投稿・保存
    Route::get('/create', [ArticlesController::class, 'create'])->name('create'); // 記事の新規投稿
    Route::post('/posts', [ArticlesController::class, 'store'])->name('store'); // 記事の保存処理

    // 記事の編集・更新・削除
    // ルートポリシーを使用して、記事の編集・更新・削除を投稿者のみに制限
    Route::get('/posts/{article}/edit', [ArticlesController::class, 'edit'])->name('edit')->middleware('can:update,article'); //記事の編集
    Route::post('/posts/{article}', [ArticlesController::class, 'update'])->name('update')->middleware('can:update,article'); //記事の更新処理。putメソッドを使用すると、リクエストパラメータが空になるためpostメソッドを使用。
    Route::delete('/posts/{article}', [ArticlesController::class, 'destroy'])->name('destroy')->middleware('can:delete,article'); //記事の削除処理

    // ユーザー情報編集
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit'); // ユーザー情報編集画面
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update'); // ユーザー情報更新処理
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy'); // ユーザー情報削除処理
});

// ログイン時・ログアウト時に関わらずアクセスできるルート
Route::controller(ArticlesController::class)->group(function () {
    Route::get('/', 'top')->name('top'); // TOPページ
    Route::get('/posts/{article}', [ArticlesController::class, 'show'])->name('show'); // 記事の閲覧
});

require __DIR__ . '/auth.php';