<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            ['title' => 'Residential Junk Removal', 'slug' => 'residential-junk-removal', 'short_description' => 'Home, garage, basement, attic cleanout', 'icon' => 'fa-home', 'price_tag' => 'Starting $99'],
            ['title' => 'Commercial Junk Removal', 'slug' => 'commercial-junk-removal', 'short_description' => 'Office, retail, warehouse cleanout', 'icon' => 'fa-building', 'price_tag' => 'Custom Quote'],
            ['title' => 'Property Cleanouts', 'slug' => 'property-cleanouts', 'short_description' => 'Full property junk removal', 'icon' => 'fa-warehouse', 'price_tag' => 'Volume Pricing'],
            ['title' => 'Construction Debris Removal', 'slug' => 'construction-debris-removal', 'short_description' => 'Concrete, wood, drywall, metals', 'icon' => 'fa-hard-hat', 'price_tag' => 'Per Ton'],
            ['title' => 'Demolition Services', 'slug' => 'demolition-services', 'short_description' => 'Sheds, decks, small structures', 'icon' => 'fa-hammer', 'price_tag' => 'Free Estimate'],
            ['title' => 'Storage Unit Cleanouts', 'slug' => 'storage-unit-cleanouts', 'short_description' => 'Abandoned or old storage units', 'icon' => 'fa-boxes', 'price_tag' => 'Same Day'],
            ['title' => 'Drain Cleaning', 'slug' => 'drain-cleaning', 'short_description' => 'Clogged drains, sewer lines', 'icon' => 'fa-water', 'price_tag' => 'Starting $149'],
            ['title' => 'Emergency Junk Removal', 'slug' => 'emergency-junk-removal', 'short_description' => '24/7 emergency service', 'icon' => 'fa-truck-fast', 'price_tag' => 'Express Service'],
        ];

        foreach ($services as $index => $service) {
            Service::create(array_merge($service, ['order' => $index + 1]));
        }
    }
}