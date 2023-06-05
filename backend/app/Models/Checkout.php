<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Checkout extends Model
{
    use HasFactory;
    protected $table = 'tb_checkout';
    protected $fillable = ['product_id', 'notes', 'quantity', 'subtotal', 'total', 'courier', 'courier_t', 'status', 'province', 'city', 'address', 'user_id'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
