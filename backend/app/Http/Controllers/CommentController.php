<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\CommentReply;
use App\Models\Product;
use App\Models\ProductDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function delete($id)
    {
      try {
        $__comment              = Comment::find($id);
        $__reply                = CommentReply::where('comment_id', $__comment->id)->get();
        foreach($__reply as $_reply)
        {
            $_reply->delete();
        }
        $__comment->delete();
        return response()->json([
            'status' => 200,
            'message' => 'success'
        ], 200);
      } catch (\Throwable $th) {
        return response()->json([
            'status' => 201,
            'message' => 'error'
        ], 201);
      }
    }
    public function view($slug)
    {
        $__product              = Product::where('slug', $slug)->first();

        $__comment              = Comment::join('users', 'users.id', 'tb_comment.user_id')
                                    ->where('product_id', $__product->id)
                                    ->orderBy('id', 'DESC')
                                    ->get(['tb_comment.*', 'users.name']);
        $__reply                = CommentReply::join('users', 'users.id', 'tb_comment_reply.user_id')
                                    ->orderBy('id', 'DESC')
                                    ->get(['tb_comment_reply.*', 'users.name']);
        return array($__comment, $__reply);
    }
    public function store(Request $request, $slug)
    {
       try {
        $__product              = Product::where('slug', $slug)->first();
        $__comment              = new Comment();
        $__comment->product_id  = $__product->id;
        $__comment->user_id     = Auth::id();
        $__comment->message     = $request->message;
        $__comment->save();
        $__product_detail           = ProductDetail::where('product_id', $__product->id)->first();
        $__product_detail->activity = $__product_detail->activity + 1;
        $__product_detail->update();
        return response()->json([
            'status' => 200,
            'message' => 'success'
        ]);
    } catch (\Throwable $th) {
           return response()->json([
               'status' => 201,
               'message' => 'server error'
           ]);
        }
    }
}
