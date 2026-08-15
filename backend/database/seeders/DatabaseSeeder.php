<?php

namespace Database\Seeders;

use App\Models\Brand\Brand;
use App\Models\Category\Category;
use App\Models\Product\Product;
use App\Models\User;
use Database\Factories\BrandFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

                // Customers
        User::factory()->count(19)->create([
            'type' => 'customer',
        ]);

        // Admin
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'type' => 'admin',
            'password' => Hash::make('password'),
        ]);

        Brand::factory(10)->create();
        Category::factory(10)->create();
        Product::factory(100)->create();
    }
}
