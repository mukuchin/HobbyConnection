<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Exceptions\PostTooLargeException;

class HandlePostTooLarge
{
    public function handle(Request $request, Closure $next)
    {
        // 画像の合計サイズが20MBを超えた場合のエラー処理
        if ($request->server('CONTENT_LENGTH') > (20 * 1024 * 1024)) { // 20MB
            dd(['total_image_size' => '一度の投稿・更新で追加する画像の合計サイズは20MB以下にしてください。']);
            return redirect($request->fullUrl())
                ->withInput($request->input())
                ->withErrors(['total_image_size' => '一度の投稿・更新で追加する画像の合計サイズは20MB以下にしてください。']);
        }

        return $next($request);
    }
}
