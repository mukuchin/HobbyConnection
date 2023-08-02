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
        'period_start',
        'period_end',
        'image_top',
        'abstract',
    ];
    
    // 1対多の「1」の方とリレーションするため、メソッド名は単数形で記述する
    public function user(){
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

