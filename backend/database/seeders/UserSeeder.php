<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::insert([
            [
                'name' => 'Administrator',
                'email' => 'admin@gmail.com',
                'no_telp' => '123456789',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'User',
                'email' => 'user@gmail.com',
                'no_telp' => '123456789',
                'password' => Hash::make('password'),
            ],
        ]);
    }
}
