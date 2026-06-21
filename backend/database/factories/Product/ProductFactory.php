<?php

namespace Database\Factories\Product;

use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Model>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->name();
        return [
            'category_id' => rand(1,10),
            'brand_id' => rand(1,10),
            'title' => $title,
            'slug' => Str::slug($title),
            'short_desc' => fake()->text(),
            'price' => rand(100,10000),

        ];
    }
}
