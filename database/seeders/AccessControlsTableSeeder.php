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
                    'id' => '1',
                    'shop_id' => '1',
                    'name' => 'Admin',
                    'email' => 'admin@gmail.com',
                    'email_verified_at' => now(),
                    'password' => bcrypt('12345678'),
                ],

            ];

            DB::table('users')->insert($data);

        }

        $dev = \App\Models\User::where('email', 'admin@gmail.com')->first();

        //data for roles table
        $data = [
            ['name' => 'Super Admin', 'guard_name' => 'admin'],
            ['name' => 'Super Admin', 'guard_name' => 'web'],
            ['name' => 'Manager', 'guard_name' => 'web'],
            ['name' => 'Employee', 'guard_name' => 'web'],
        ];
        DB::table('roles')->insert($data);

        //data for permissions table
        $data = [




            ['name' => 'role-list', 'guard_name' => 'web'],
            ['name' => 'role-create', 'guard_name' => 'web'],
            ['name' => 'role-show', 'guard_name' => 'web'],
            ['name' => 'role-edit', 'guard_name' => 'web'],
            ['name' => 'role-delete', 'guard_name' => 'web'],

            ['name' => 'user-list', 'guard_name' => 'web'],
            ['name' => 'user-create', 'guard_name' => 'web'],
            ['name' => 'user-show', 'guard_name' => 'web'],
            ['name' => 'user-edit', 'guard_name' => 'web'],
            ['name' => 'user-delete', 'guard_name' => 'web'],



        ];

        DB::table('permissions')->insert($data);
        //Data for role user pivot
        $data = [
            ['role_id' => 1, 'model_type' => 'App\Models\User', 'model_id' => $dev->id],
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
