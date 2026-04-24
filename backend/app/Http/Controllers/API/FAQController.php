<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\FAQ;
use Illuminate\Http\Request;

class FAQController extends Controller
{
    public function index()
    {
        $faqs = FAQ::where('is_active', true)
            ->orderBy('order')
            ->get();
        
        return response()->json($faqs);
    }
}