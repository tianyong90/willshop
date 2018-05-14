<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // 先填充 permission 和 role
        $this->call(RolesAndPermissionsSeeder::class);

        $this->call(UsersTableSeeder::class);

        factory(App\ProductCategory::class, 10)->create();
        factory(App\Product::class, 50)->create();
        factory(App\Post::class, 20)->create();
        factory(App\Address::class, 5)->create();
    }
}
