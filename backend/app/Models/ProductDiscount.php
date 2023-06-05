<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDiscount extends Model
{
    use HasFactory;
    protected $table = 'tb_product_discount';
    protected $fillable = ['product_id', 'special_price'];
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
