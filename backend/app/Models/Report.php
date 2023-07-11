<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;
    protected $table = 'tb_report';
    protected $fillable = ['product_id', 'sales_amount'];
    function product(){
        return $this->belongsTo(Product::class);
    }
}
