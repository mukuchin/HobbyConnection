<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;

// 画像の合計サイズが20MBを超えた場合のエラー処理
class HandlePostTooLarge
{
    public function handle(Request $request, Closure $next)
    {
        // 画像の合計サイズを計算
        $totalSize = $this->calculateTotalSize($request->allFiles());

        // 20MB以下なら次の処理へ
        $response = $next($request);

        // 20MBを超えていたらエラー処理
        if ($totalSize > (20 * 1024 * 1024)) { // 20MB
            $newError = ['total_image_size' => ['一度の投稿・更新で追加する画像の合計サイズは20MB以下にしてください。']];

            // 既存のエラーメッセージを取得
            $errors = session()->get('errors');

            // 新しいエラーメッセージを追加
            if ($errors instanceof \Illuminate\Support\ViewErrorBag) {
                $errors->add('total_image_size', '一度の投稿・更新で追加する画像の合計サイズは20MB以下にしてください。');
            } else {
                $errors = new \Illuminate\Support\MessageBag($newError);
                $viewErrorBag = new \Illuminate\Support\ViewErrorBag();
                $viewErrorBag->put('default', $errors);
                session()->flash('errors', $viewErrorBag);
                return redirect()->back()->withInput($request->input());
            }

            // エラーメッセージをセッションに保存
            session()->flash('errors', $errors);

            return redirect()->back()->withInput($request->input());
        }

        return $response;
    }


    // 画像の合計サイズを計算
    private function calculateTotalSize($files)
    {
        $totalSize = 0;

        foreach ($files as $file) {
            if (is_array($file)) {
                $totalSize += $this->calculateTotalSize($file);
            } elseif ($file instanceof UploadedFile) {
                $totalSize += $file->getSize();
            }
        }

        return $totalSize;
    }
}
