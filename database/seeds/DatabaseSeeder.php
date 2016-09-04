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

        factory(App\ProductCategory::class, 3)->create();
        factory(App\Product::class, 20)->create();
        factory(App\Post::class, 10)->create();
    }
}
