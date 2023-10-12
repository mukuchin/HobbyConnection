<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class IncreaseStringLengthsOnCommentsTable extends Migration
{
    public function up()
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->string('comment', 5000)->change();
        });
    }

    public function down()
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->string('comment')->change();
        });
    }
}
