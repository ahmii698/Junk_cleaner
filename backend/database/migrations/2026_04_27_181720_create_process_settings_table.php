<?php
// database/migrations/xxxx_create_process_settings_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('process_settings', function (Blueprint $table) {
            $table->id();
            $table->string('section_title')->default('How We Work');
            $table->string('section_highlight')->default('We Work');
            $table->json('steps')->nullable(); // Store steps as JSON
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('process_settings');
    }
};