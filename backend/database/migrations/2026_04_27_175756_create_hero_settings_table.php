<?php
// database/migrations/xxxx_create_hero_settings_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('hero_settings', function (Blueprint $table) {
            $table->id();
            $table->string('badge_text')->default("Maplewood's Most Trusted | 12+ Years");
            $table->string('heading_line1')->default('Clear Your Space.');
            $table->string('heading_line2')->default('Fast. Fair. Green.');
            $table->text('description')->default('Professional junk removal services — from single items to full property cleanouts. Same-day service available.');
            $table->string('button_text')->default('Get Free Estimate →');
            $table->string('button_link')->default('/contact');
            $table->string('stat1_text')->default('3500+ projects');
            $table->string('stat2_text')->default('95% recycled');
            $table->string('stat3_text')->default('5.0 stars (412 reviews)');
            $table->string('hero_image')->default('/download.jfif');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('hero_settings');
    }
};