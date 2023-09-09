<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function articles()
    {
        return $this->belongsToMany('App\Models\Article');
    }

    // 多対多のリレーション
    // このタグに紐づくプロフィールを取得
    // 未使用
    public function profiles()
    {
        return $this->belongsToMany('App\Models\Profile');
    }
}
