<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class IncreaseStringLengthsOnPostsTable extends Migration
{
    public function up()
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->string('image', 1000)->nullable()->change();
            $table->string('comment', 5000)->change();
            $table->string('heading', 2000)->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->string('image')->nullable()->change();
            $table->string('comment')->change();
            $table->string('heading')->nullable()->change();
        });
    }
}