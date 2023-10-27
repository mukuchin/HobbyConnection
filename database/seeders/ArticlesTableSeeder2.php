<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;

class ArticlesTableSeeder2 extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Article::factory(40)
            ->state(['user_id' => 3]) // テスト用環境のtest-user2のidは3
            ->create();
    }
}
