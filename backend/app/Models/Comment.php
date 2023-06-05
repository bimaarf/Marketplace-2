<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $table = 'tb_comment';
    protected $fillable = ['product_id', 'user_id', 'message'];
    public function getCreatedAtAttribute()
    {
        return \Carbon\Carbon::parse($this->attributes['updated_at'])
       ->diffForHumans();
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function commentReply()
    {
        return $this->hasMany(CommentReply::class);
    }
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
