<?php
// app/Models/FooterSetting.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FooterSetting extends Model
{
    protected $table = 'footer_settings';
    
    protected $fillable = [
        'company_name', 'company_desc', 'facebook_url', 'instagram_url', 'twitter_url',
        'copyright_text', 'license_text', 'phone', 'email', 'address', 'footer_bg', 'is_active'
    ];
}
