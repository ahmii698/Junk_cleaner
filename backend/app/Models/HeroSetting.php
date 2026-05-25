<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSetting extends Model
{
    protected $table = 'hero_settings';
    
    protected $fillable = [
        'badge_text',
        'heading_line1',
        'heading_line2',
        'description',
        'button_text',
        'button_link',
        'stat1_text',
        'stat2_text',
        'stat3_text',
        'hero_image',
        'is_active'
    ];
}