<?php

use App\Http\Controllers\ProfileController;
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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::controller(ArticlesController::class)->middleware(['auth'])->group(function () {
    Route::get('/index', 'top')->name('top'); //TOPページ表示
    Route::post('/posts', 'store')->name('store'); //保存処理
    Route::get('/posts/create', 'create')->name('create'); //記事の新規投稿
    Route::get('/posts/myposts', 'myposts')->name('myposts'); //自分が投稿した記事の一覧
    Route::get('/posts/{article}', 'show')->name('show'); //記事の閲覧
    Route::put('/posts/{article}', 'update')->name('update'); //記事の更新
    Route::delete('/posts/{article}', 'delete')->name('delete'); //記事の削除
    Route::get('/posts/{article}/edit', 'edit')->name('edit'); //記事の編集
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';