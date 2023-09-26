<?php

// いいね機能のコントローラー

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Like;

class LikeController extends Controller
{
    // いいねの追加・削除
    public function toggleLike($articleId)
    {
        $user = auth()->user();

        // -----------------------------------
        // テスト用
        // 認証されていない場合はエラーを返す
        // if (!auth()->check()) {
        //     return response()->json(['message' => 'User not authenticated'], 401);
        // }
        // -----------------------------------
        

        // -----------------------------------
        // エラー発生箇所
        // ユーザーが指定された記事に「いいね」をしているか確認
        $isLiked = Like::where('user_id', $user->id)->where('article_id', $articleId)->exists();
        // -----------------------------------

        if ($isLiked) {
            // すでに「いいね」をしている場合は削除
            Like::where('user_id', $user->id)->where('article_id', $articleId)->delete();
        } else {
            // まだ「いいね」をしていない場合は追加
            Like::create([
                'user_id' => $user->id,
                'article_id' => $articleId
            ]);
        }

        // -----------------------------------
        // テスト用
        // $isLiked = false;
        // -----------------------------------

        // 新しい「いいね」の状態を取得
        $newIsLiked = !$isLiked;

        // 「いいね」の総数を取得
        $likesCount = Like::where('article_id', $articleId)->count();

        return response()->json([
            'isLiked' => $newIsLiked,
            'likesCount' => $likesCount
        ]);
    }

    // いいねの状態を取得
    public function getLikeData($articleId)
    {
        $user = auth()->user();
        $isLiked = false;
        $likesCount = 0;

        if ($user) {
            $isLiked = Like::where('user_id', $user->id)->where('article_id', $articleId)->exists();
        }

        $likesCount = Like::where('article_id', $articleId)->count();

        return response()->json([
            'isLiked' => $isLiked,
            'likesCount' => $likesCount
        ]);
    }

}
