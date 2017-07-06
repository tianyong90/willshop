<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);

        factory(App\ProductCategory::class, 10)->create();
        factory(App\Product::class, 50)->create();
        factory(App\Post::class, 20)->create();
        factory(App\Address::class, 5)->create();
    }
}
