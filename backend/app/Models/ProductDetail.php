<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDetail extends Model
{
    use HasFactory;
    protected $table = 'tb_product_detail';
    protected $fillable = ['product_id', 'ulasan', 'activity'];
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

}
