<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model
{
    use HasFactory;
    protected $table = 'users_detail';
    protected $fillable = ['user_id', 'no_telp'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
