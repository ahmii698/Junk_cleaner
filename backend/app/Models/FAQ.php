<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FAQ extends Model
{
    protected $table = 'f_a_q_s';  // 🔥 Table name specify karo
    
    // 🔥 Mass assignment ke liye fillable fields
    protected $fillable = [
        'question',
        'answer',
        'order',
        'is_active'
    ];
    
    // 🔥 Data types cast karo
    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer'
    ];
}