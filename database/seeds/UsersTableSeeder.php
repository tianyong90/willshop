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
        $user = \App\User::create([
            'name' => 'admin',
            'password' => Hash::make('12345678'),
            'mobile' => '13211112222',
            'email' => 'admin@qq.com',
            'avatar' => '',
        ]);

        // 绑定 super-admin 角色
        $user->assignRole('super-admin');
    }
}
