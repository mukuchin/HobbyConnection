<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class IncreaseStringLengthsOnArticlesTable extends Migration
{
    public function up()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->string('title', 2000)->change();
            $table->string('image_top', 1000)->nullable()->change();
            $table->string('description', 5000)->change();
        });
    }

    public function down()
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->string('title')->change();
            $table->string('image_top')->nullable()->change();
            $table->string('description')->change();
        });
    }
}