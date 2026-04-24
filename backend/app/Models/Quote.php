<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    use HasFactory;
    
    protected $table = 'quotes';
    
    protected $fillable = [
        'name',
        'email',
        'phone',
        'service',
        'description',
        'images',
        'ip_address',
        'is_read'
    ];
    
    protected $casts = [
        'images' => 'array'
    ];
}