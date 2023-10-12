<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class IncreaseStringLengthsOnProfilesTable extends Migration
{
    public function up()
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->string('bio', 5000)->nullable()->change();
            $table->string('tags', 1000)->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->string('bio')->nullable()->change();
            $table->string('tags')->nullable()->change();
        });
    }
}