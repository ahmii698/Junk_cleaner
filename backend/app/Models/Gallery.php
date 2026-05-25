<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $table = 'galleries';
    
    // 🔥 Mass assignment ke liye fillable fields
    protected $fillable = [
        'title',
        'image_path',
        'category',
        'description',
        'order',
        'is_active'
    ];
    
    // 🔥 Data types cast karo
    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer'
    ];
}