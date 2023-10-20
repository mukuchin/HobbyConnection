<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckPostSize
{
    public function handle(Request $request, Closure $next)
    {
        // post_max_sizeをバイト単位で取得
        $postMaxSize = ini_get('post_max_size');
        $multiplier = strtoupper(substr($postMaxSize, -1));
        $value = (int) $postMaxSize;
        switch ($multiplier) {
            case 'K':
                $value *= 1024;
                break;
            case 'M':
                $value *= 1024 * 1024;
                break;
            case 'G':
                $value *= 1024 * 1024 * 1024;
                break;
        }

        if ($_SERVER['CONTENT_LENGTH'] > $value) {
            return redirect()->back()->withErrors(['total_image_size' => '一度の投稿・更新で追加する画像の合計サイズは20MB以下にしてください。']);
        }

        return $next($request);
    }
}

