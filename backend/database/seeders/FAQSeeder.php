<?php

namespace Database\Seeders;

use App\Models\FAQ;
use Illuminate\Database\Seeder;

class FAQSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            ['question' => 'How fast can you come?', 'answer' => 'Same-day or next-day service. Emergency slots available 24/7.', 'order' => 1],
            ['question' => 'What items do you take?', 'answer' => 'Furniture, appliances, electronics, yard waste, construction debris. No hazardous materials (chemicals, asbestos, paint).', 'order' => 2],
            ['question' => 'Do I need to be home?', 'answer' => 'Not necessary if items are accessible. We will send before/after photos.', 'order' => 3],
            ['question' => 'How is pricing calculated?', 'answer' => 'Based on volume/weight. Free upfront quote before any work starts.', 'order' => 4],
            ['question' => 'Do you donate usable items?', 'answer' => 'Yes! We partner with local charities for furniture, electronics & appliances in good condition.', 'order' => 5],
            ['question' => 'Are you licensed and insured?', 'answer' => 'Yes, fully licensed (#JR-2847-NJ) and insured for your protection.', 'order' => 6],
        ];

        foreach ($faqs as $faq) {
            FAQ::create($faq);
        }
    }
}