<?php

namespace Database\Seeders;

use App\Models\Gallery;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $galleries = [
            ['title' => 'Garage Transformation', 'image_path' => '/images/gallery/garage-cleanout.jpg', 'category' => 'Residential', 'order' => 1],
            ['title' => 'Full House Estate', 'image_path' => '/images/gallery/house-cleanout.jpg', 'category' => 'Estate', 'order' => 2],
            ['title' => 'Demolition Hauling', 'image_path' => '/images/gallery/demolition.jpg', 'category' => 'Demolition', 'order' => 3],
            ['title' => 'Commercial Cleanout', 'image_path' => '/images/gallery/commercial.jpg', 'category' => 'Commercial', 'order' => 4],
        ];

        foreach ($galleries as $gallery) {
            Gallery::create($gallery);
        }
    }
}