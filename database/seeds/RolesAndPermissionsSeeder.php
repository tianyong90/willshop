<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // 清理缓存的 roles 和 permissions
        app()['cache']->forget('spatie.permission.cache');

        // 创建 permissions
        Permission::create(['name' => 'edit articles']);

        // create roles and assign created permissions.
        $role = Role::create(['name' => 'super-admin']);
        Role::create(['name' => 'normal-user']);
        Role::create(['name' => 'vip']);

        $role->givePermissionTo(Permission::all());
    }
}
