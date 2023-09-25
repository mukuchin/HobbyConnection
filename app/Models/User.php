<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function articles()
    {
        return $this->hasMany('App\Models\Article');
    }

    public function profile()
    {
        return $this->hasOne('App\Models\Profile');
    }

    public function comments()
    {
        return $this->hasMany('App\Models\Comment');
    }
    
    public function posts()
    {
        return $this->hasMany('App\Models\Post');
    }

    // いいね機能
    // このユーザーがいいねした記事を取得
    public function likeEntries() {
        return $this->hasMany('App\Models\Like');
    }
    
    // いいね機能
    
    public function likedArticles() {
        return $this->belongsToMany('App\Models\Article', 'likes');
    }
    

    // フォロー機能
    // このユーザーがフォローしているユーザーを取得
    // 未使用
    public function follows() {
        return $this->hasMany('App\Models\Follow');
    }

    // フォロワー機能
    // このユーザーをフォローしているユーザーを取得
    // 未使用
    public function followers() {
        return $this->hasMany('App\Models\Follow', 'follow_id');
    }
    
}