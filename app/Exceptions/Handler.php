<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Http\Exceptions\PostTooLargeException;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    // 画像の合計サイズが20MBを超えた場合のエラー処理
    // 「PostTooLargeException」エラーよりも先に処理を行う
    public function render($request, Throwable $exception)
    {
        if ($exception instanceof PostTooLargeException) {
            dd($exception);
            // ここでカスタムのバリデーションエラーメッセージを返す
            return redirect($request->fullUrl())
                ->withInput($request->input())
                ->withErrors(['total_image_size' => '一度の投稿・更新で追加する画像の合計サイズは20MB以下にしてください。']);
        }

        return parent::render($request, $exception);
    }

}
