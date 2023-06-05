<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
class UserAssignSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $administrator = Role::where('name', 'administrator')->first();
        $user = Role::where('name', 'user')->first();

        $_admin = User::where('email', 'admin@gmail.com')->first();
        $_admin->addRole($administrator);
        $_user = User::where('email', 'user@gmail.com')->first();
        $_user->addRole($user);
        UserDetail::insert([
            [
                'user_id' => $_admin->id,
                'no_telp' => '-',
            ],
            [
                'user_id' => $_user->id,
                'no_telp' =>'-',
            ]

        ]);
    }
}
