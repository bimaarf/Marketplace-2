<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\Ratting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RattingController extends Controller
{
    public function view($slug)
    {
        $__product              = Product::where('slug', $slug)->first();

        $__ratting              = Ratting::join('users', 'users.id', 'tb_ratting.user_id')
                                        ->where('product_id', $__product->id)
                                        ->orderBy('id', 'DESC')
                                        ->get(['tb_ratting.*', 'users.name']);
        return $__ratting;
    }
    public function store(Request $request, $id)
    {
        $___ratting                 = Ratting::where('product_id', $id)
                                        ->where('user_id', Auth::id())
                                        ->get();
        if (count($___ratting) > 0) {
            return response()->json([
                'status' => 202,
                'message' => 'error'
            ], 202);
        }
        try {
            $__ratting              = new Ratting();
            $__ratting->product_id  = $id;
            $__ratting->stars       = $request->stars;
            $__ratting->message     = $request->message;
            $__ratting->user_id     = Auth::id();
            $__ratting->save();
            $__rate_get = Ratting::where('product_id', $__ratting->product_id)->get();
            $__product_detail           = ProductDetail::where('product_id', $__ratting->product_id)->first();
            $__rate = $request->stars / count($__rate_get);
            $__product_detail->ulasan   = $__rate + $__product_detail->ulasan;
            $__product_detail->activity = $__product_detail->activity + 1;
            $__product_detail->update();
            return response()->json([
                'status' => 200,
                'message' => 'success'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 201,
                'message' => 'error'
            ], 201);
        }

    }
}
