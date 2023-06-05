<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'tb_product';
    protected $fillable = ['title', 'slug', 'desc' , 'price', 'stock', 'image', 'category_id'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function comment()
    {
        return $this->hasMany(Comment::class);
    }
    public function productDiscount()
    {
        return $this->hasMany(ProductDiscount::class);
    }
    public function productDetail()
    {
        return $this->hasMany(ProductDetail::class);
    }
}
