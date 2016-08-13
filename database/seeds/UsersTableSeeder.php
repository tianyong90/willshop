<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\User::create([
            'name' => 'admin',
            'password' => bcrypt('123456'),
            'email' => 'abc@qq.com',
            'api_token' => str_random(60),
        ]);
    }
}
