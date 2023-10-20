<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Exceptions\PostTooLargeException;

class HandlePostTooLarge
{
    public function handle(Request $request, Closure $next)
    {
        try {
            return $next($request);
        } catch (PostTooLargeException $e) {
            return redirect($request->fullUrl())
                ->withInput($request->input())
                ->withErrors(['total_image_size' => '一度の投稿・更新で追加する画像の合計サイズは20MB以下にしてください。']);
        }
    }
}
