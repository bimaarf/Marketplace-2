<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::create([
            'name' => 'administrator',
            'display_name' => 'Administrator', // optional
            'description' => 'Administrator Sistem', // optional
        ]);
        $user = Role::create([
            'name' => 'user',
            'display_name' => 'User', // optional
            'description' => 'User Sistem', // optional
        ]);
        $aktif      = Permission::create([
            'name'          => 'aktif',
        ]);
        $tidakAktif      = Permission::create([
            'name'          => 'tidak-aktif',
        ]);
        $admin->givePermissions([$aktif]);
        $user->givePermissions([$aktif]);
    }
}
