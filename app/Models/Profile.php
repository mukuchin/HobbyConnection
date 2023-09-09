<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Profile extends Model
{
    use SoftDeletes;

    protected $fillable = ['user_id', 'bio', 'tags'];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    // 多対多のリレーション
    // このプロフィールに紐づくタグを取得
    // 未使用
    public function tags()
    {
        return $this->belongsToMany('App\Models\Tag');
    }
}