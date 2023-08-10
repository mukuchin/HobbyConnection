<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Article extends Model
{
    use HasFactory;
    use SoftDeletes;

    //データベースに保存する処理
    protected $fillable = [
        'user_id',
        'title',
        'started_at',
        'ended_at',
        'image_top',
        'description',
    ];

    public function user()
    {
        //Userモデルのデータを取得する
        return $this->belongsTo('App\Models\User');
    }

    public function getPaginateByLimit(int $limit_count = 5)
    {
        // updated_atで降順に並べたあと、limitで件数制限をかける
        return $this->orderBy('updated_at', 'DESC')->paginate($limit_count);
    }

    public function getPaginateOnlyLoginUserByLimit(int $limit_count = 5, $user_id)
    {
        return $this->where('user_id', $user_id)->orderBy('updated_at', 'DESC')->paginate($limit_count);
    }
}