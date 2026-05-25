<?php
// app/Models/AboutSetting.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutSetting extends Model
{
    protected $table = 'about_settings';
    
    protected $fillable = [
        'heading', 'highlight_word', 'paragraph1', 'paragraph2', 'about_image',
        'stat1_number', 'stat1_label', 'stat2_number', 'stat2_label', 
        'stat3_number', 'stat3_label',
        'card1_icon', 'card1_title', 'card1_desc',
        'card2_icon', 'card2_title', 'card2_desc',
        'card3_icon', 'card3_title', 'card3_desc',
        'button_text', 'button_link', 'is_active'
    ];
}