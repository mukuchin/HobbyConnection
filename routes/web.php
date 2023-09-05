<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ArticlesController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// ログイン時のみアクセスできるルート
Route::middleware('auth')->group(function () {
    Route::get('/mypage', [ArticlesController::class, 'mypage'])->name('mypage'); //マイページ

    // 記事の編集や閲覧など
    Route::get('/create', [ArticlesController::class, 'create'])->name('create'); //記事の新規投稿
    Route::put('/posts/{article}', [ArticlesController::class, 'update'])->name('update'); //記事の更新
    Route::delete('/posts/{article}', [ArticlesController::class, 'delete'])->name('delete'); //記事の削除
    Route::get('/posts/{article}/edit', [ArticlesController::class, 'edit'])->name('edit'); //記事の編集
    Route::post('/posts', [ArticlesController::class, 'store'])->name('store'); //記事の保存処理

    // プロフィール編集
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit'); //プロフィール編集画面
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update'); //プロフィール更新処理
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy'); //プロフィール削除処理
});

// ログイン時・ログアウト時に関わらずアクセスできるルート
Route::controller(ArticlesController::class)->group(function () {
    Route::get('/', 'top')->name('top'); //TOPページ
    Route::get('/posts/{article}', [ArticlesController::class, 'show'])->name('show'); //記事の閲覧
});

require __DIR__ . '/auth.php';