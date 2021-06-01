<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;

class AccessControlsTableSeeder extends Seeder
{
    public function run()
    {
        // Reset cached roles and permissions
        app()['cache']->forget('spatie.permission.cache');

        $dev = User::where('email', 'super@admin.com')->first();

        if (empty($dev)) {
            $data = [
                [
                    'name' => 'Admin',
                    'email' => 'admin@gmail.com',
                    'email_verified_at' => now(),
                    'password' => bcrypt('12345678'),
                ],
            ];
            DB::table('admins')->insert($data);
        }

        $dev = \App\Models\Admin\Admin::where('email', 'admin@gmail.com')->first();

        //data for roles table
        $data = [
            ['name' => 'Super Admin', 'guard_name' => 'admin'],
            ['name' => 'Super Admin', 'guard_name' => 'user'],
            ['name' => 'Manager', 'guard_name' => 'user'],
            ['name' => 'Employee', 'guard_name' => 'user'],
        ];
        DB::table('roles')->insert($data);

        //data for permissions table
        $data = [
            ['name' => 'role-list', 'guard_name' => 'user'],
            ['name' => 'role-create', 'guard_name' => 'user'],
            ['name' => 'role-show', 'guard_name' => 'user'],
            ['name' => 'role-edit', 'guard_name' => 'user'],
            ['name' => 'role-delete', 'guard_name' => 'user'],

            ['name' => 'user-list', 'guard_name' => 'user'],
            ['name' => 'user-create', 'guard_name' => 'user'],
            ['name' => 'user-show', 'guard_name' => 'user'],
            ['name' => 'user-edit', 'guard_name' => 'user'],
            ['name' => 'user-delete', 'guard_name' => 'user'],
        ];

        DB::table('permissions')->insert($data);
        //Data for role user pivot
        $data = [
            ['role_id' => 1, 'model_type' => 'App\Models\Admin\Admin', 'model_id' => $dev->id],
        ];
        DB::table('model_has_roles')->insert($data);
        //Data for role permission pivot
        $permissions = Permission::all();
        foreach ($permissions as $key => $value) {
            $data = [
                ['permission_id' => $value->id, 'role_id' => 1],
            ];
            DB::table('role_has_permissions')->insert($data);
        }
    }
}
