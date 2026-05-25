<?php
// app/Models/ProcessSetting.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProcessSetting extends Model
{
    protected $table = 'process_settings';
    
    protected $fillable = [
        'section_title',
        'section_highlight',
        'step1_title',
        'step1_desc',
        'step2_title',
        'step2_desc',
        'step3_title',
        'step3_desc',
        'step4_title',
        'step4_desc',
        'is_active'
    ];
}