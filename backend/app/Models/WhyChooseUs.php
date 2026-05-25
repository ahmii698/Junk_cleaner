<?php
// app/Models/WhyChooseUs.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WhyChooseUs extends Model
{
    protected $table = 'why_choose_us';
    
    protected $fillable = [
        'section_title',
        'section_highlight',
        'card1_icon', 'card1_title', 'card1_desc', 'card1_price',
        'card2_icon', 'card2_title', 'card2_desc', 'card2_price',
        'card3_icon', 'card3_title', 'card3_desc', 'card3_price',
        'is_active'
    ];
}