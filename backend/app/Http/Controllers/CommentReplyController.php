<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\CommentReply;
use App\Models\ProductDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentReplyController extends Controller
{
    public function store(Request $request, $id)
    {
       try {
        $__comment              = Comment::find($id);
        $__reply                = new CommentReply();
        $__reply->comment_id    = $__comment->id;
        $__reply->user_id       = Auth::id();
        $__reply->message       = $request->message;
        $__reply->save();
        $__product_detail           = ProductDetail::where('product_id', $__comment->product_id)->first();
        $__product_detail->activity = $__product_detail->activity + 1;
        $__product_detail->update();
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
}
