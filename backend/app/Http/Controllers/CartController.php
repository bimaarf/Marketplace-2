<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use App\Models\ProductDiscount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function view ()
    {
        $__cart                    = Cart::join('tb_product', 'tb_product.id', 'tb_cart.product_id')
                                        ->join('tb_product_discount', 'tb_product_discount.product_id', 'tb_product.id')
                                    ->where('user_id', Auth::id())
                                    ->get(['tb_cart.*', 'tb_product.title', 'tb_product.stock', 'tb_product.price', 'tb_product.image', 'tb_product_discount.special_price']);
        $__total = 0;
        foreach ($__cart as $_cart)
        {
            $__total += $_cart->subtotal;
        }
        return array($__cart, $__total);
    }
    public function delete($id)
    {
        try {
            $__cart                         = Cart::find($id);
            $__cart->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Success'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 201,
                'message' => 'error'
            ], 201);
        }
    }
    public function update(Request $request)
    {

        if ($request->min)
        {
            $__cart                     = Cart::find($request->min);
            $__product                  = Product::find($__cart->product_id);
            $__discount                 = ProductDiscount::where('product_id', $__product->id)->first();
            $__cart->quantity           = $__cart->quantity - 1;
            if ($__discount->special_price === null)
            {
                $__cart->subtotal           = $__product->price * $__cart->quantity;
            }else {
                $__cart->subtotal           = $__discount->special_price * $__cart->quantity;
            }
        }
        if ($request->plus)
        {
            $__cart                     = Cart::find($request->plus);
            $__product                  = Product::find($__cart->product_id);
            $__discount                 = ProductDiscount::where('product_id', $__product->id)->first();
            $__cart->quantity           = $__cart->quantity + 1;
            if ($__discount->special_price === null)
            {
                $__cart->subtotal           = $__product->price * $__cart->quantity;
            }else {
                $__cart->subtotal           = $__discount->special_price * $__cart->quantity;
            }
        }
        $__cart->update();
    }
    public function store(Request $request, $slug)
    {
        try {
            $__product              = Product::where('slug', $slug)->first();
            $__discount             = ProductDiscount::where('product_id', $__product->id)->first();
            $___cart                = Cart::where('product_id', $__product->id)->first();
            if ($__product->stock <= 0)
            {
                return response()->json([
                    'status' => 202,
                    'message' => 'error'
                ]);
            }
            if ($___cart)
            {
                $___cart->notes      = $request->notes;
                $___cart->quantity   = $___cart->quantity + $request->quantity;
                if ($__discount->special_price === null)
                {
                    $___cart->subtotal   = $__product->price * $___cart->quantity;
                }else
                {
                    $___cart->subtotal   = $__discount->special_price * $___cart->quantity;
                }
                $___cart->update();
                return response()->json([
                    'status' => 200,
                    'message' => 'success'
                ]);
            }
            $__cart                 = new Cart();
            $__cart->product_id     = $__product->id;
            $__cart->notes          = $request->notes;
            $__cart->quantity       = $request->quantity;
            if ($__discount->special_price === null)
            {
                $__cart->subtotal       = $__product->price * $request->quantity;
            }else {
                $__cart->subtotal       = $__discount->special_price * $request->quantity;
            }
            $__cart->user_id        = Auth::id();
            $__cart->save();
            return response()->json([
                'status' => 200,
                'message' => 'success'
            ]);
            } catch (\Throwable $th) {
                return response()->json([
                    'status' => 201,
                    'message' => 'error'
                ]);
        }
    }
}
