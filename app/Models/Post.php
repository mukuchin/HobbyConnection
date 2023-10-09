<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    // データベースに保存する処理
    protected $fillable = [
        'user_id',
        'article_id',
        'image',
        'heading',
        'comment',
    ];

    // 親モデルの更新日時を更新する
    protected $touches = ['article'];


    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function article()
    {
        return $this->belongsTo('App\Models\Article');
    }
}