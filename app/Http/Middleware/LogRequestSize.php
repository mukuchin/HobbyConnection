<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LogRequestSize
{
    public function handle(Request $request, Closure $next)
    {
        // リクエストサイズをログに記録
        $size = $request->header('content-length', '0');
        Log::info("Request size: {$size} bytes");

        return $next($request);
    }
}