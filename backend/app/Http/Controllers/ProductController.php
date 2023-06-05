<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Checkout;
use App\Models\Comment;
use App\Models\CommentReply;
use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\ProductDiscount;
use App\Models\Ratting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function populerGet()
    {
        $__product = Product::join('tb_product_discount', 'tb_product_discount.product_id', 'tb_product.id')
                    ->join('tb_product_detail', 'tb_product_detail.product_id', 'tb_product.id')
                    ->orderBy('tb_product_detail.activity', 'DESC')
                    ->take(6)
                    ->get(['tb_product.*', 'tb_product_discount.special_price', 'tb_product_detail.ulasan', 'tb_product_detail.activity']);
        return $__product;
    }
    public function detail($slug)
    {
        $__product      =Product::join('tb_product_discount', 'tb_product_discount.product_id', 'tb_product.id')
                ->join('tb_product_detail', 'tb_product_detail.product_id', 'tb_product.id')
                ->where('slug', $slug)->first(['tb_product.*', 'tb_product_discount.special_price', 'tb_product_detail.ulasan', 'tb_product_detail.activity']);
        $__product_detail           = ProductDetail::where('product_id', $__product->id)->first();
        $__product_detail->activity = $__product_detail->activity + 1;
        $__product_detail->update();
        return $__product;
    }
    public function view(Request $request)
    {

        if ($request->has('search'))
        {
            $__product = Product::join('tb_product_discount', 'tb_product_discount.product_id', 'tb_product.id')
            ->join('tb_product_detail', 'tb_product_detail.product_id', 'tb_product.id')
            ->join('tb_category', 'tb_category.id', 'tb_product.category_id')
            ->where('title', 'LIKE', '%' . $request->search . '%')
            ->orWhere('name', 'LIKE', '%' . $request->search . '%')
            ->get(['tb_product.*', 'tb_product_discount.special_price', 'tb_product_detail.ulasan', 'tb_product_detail.activity']);
            return $__product;
        }
        if ($request->has('promo'))
        {
            $__product = Product::join('tb_product_discount', 'tb_product_discount.product_id', 'tb_product.id')
            ->join('tb_product_detail', 'tb_product_detail.product_id', 'tb_product.id')
            ->where('special_price', '!=', null)
            ->get(['tb_product.*', 'tb_product_discount.special_price', 'tb_product_detail.ulasan', 'tb_product_detail.activity']);
            return $__product;
        }

        $__product = Product::join('tb_product_discount', 'tb_product_discount.product_id', 'tb_product.id')
        ->join('tb_product_detail', 'tb_product_detail.product_id', 'tb_product.id')
        ->orderBy('id', 'desc')
        ->get(['tb_product.*', 'tb_product_discount.special_price', 'tb_product_detail.ulasan', 'tb_product_detail.activity']);
        return $__product;
    }
    public function update(Request $request, $slug)
    {
       try {
            $__product = Product::where('slug', $slug)->first();
            $__product->title       = $request->title;
            $__product->desc        = $request->desc;
            $__product->price       = $request->price;
            $__product->stock       = $request->stock;
            $__product->category_id = $request->category_id;
            $__product->update();
            return response()->json([
                'status' => 200,
                'message' => 'updated'
            ]);
       } catch (\Throwable $th) {
            return response()->json([
                'status' => 201,
                'message' => 'error'
            ]);
       }
    }
    public function delete($slug)
    {
       try {
            $__product = Product::where('slug', $slug)->first();
            $__product_d = ProductDetail::where('product_id', $__product->id)->first();
            $__product_discount = ProductDiscount::where('product_id', $__product->id)->first();
            $__cart         = Cart::where('product_id', $__product->id)->get();
            $__checkout         = Checkout::where('product_id', $__product->id)->get();
            $__ratting         = Ratting::where('product_id', $__product->id)->get();
            $__comment          = Comment::where('product_id', $__product->id)->get();
            foreach ($__comment as $_comment)
            {
                $_reply     = CommentReply::where('comment_id', $_comment->id)->first();
                if ($_reply)
                {
                    $_reply->delete();
                }
                $_comment->delete();
            }
            foreach ($__cart as $_cart)
            {
                $_cart->delete();
            }
            foreach ($__checkout as $_checkout)
            {
                $_checkout->delete();
            }
            foreach ($__ratting as $_ratting)
            {
                $_ratting->delete();
            }
            $__product_d->delete();
            $__product_discount->delete();
            $__product->delete();
            return response()->json([
                'status' => 200,
                'message' => 'deleted'
            ]);
       } catch (\Throwable $th) {
            return response()->json([
                'status' => 201,
                'message' => 'error'
            ]);
       }
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'desc' => 'required',
            'price' => 'required',
            'stock' => 'required',
            'category_id' => 'required',
            'image.*' => 'required|image|mimes:jpeg,jpg,png,webp',
        ]);
        if ($validator->fails())
        {
            return response()->json([
                'status' => 202,
                'message' => 'Validator error'
            ]);
        }
        try {
            $___product     = Product::where('title', $request->title)->get();
            if (count($___product) > 0)
            {
                return response()->json([
                    'status' => 203,
                    'message' => 'Validator error'
                ]);
            }

            $__product = new Product();
            $__product->title       = $request->title;
            $__product->slug        = Str::slug($request->title);
            $__product->desc        = $request->desc;
            $__product->price       = $request->price;
            $__product->stock       = $request->stock;
            $__product->category_id = $request->category_id;


            if ($request->hasFile('image')) {
                foreach ($request->file('image') as $file) {
                    $filename = time() . '-' . $file->getClientOriginalName();
                    $file->move(public_path('Images/Product'), $filename);
                    $data[] = $filename;
                }

                $__product->image = json_encode($data);
                $__product->save();
                $__discount             = new ProductDiscount();
                $__discount->product_id = $__product->id;
                $__discount->special_price = $request->special_price;
                $__discount->save();
                $__product_detail           = new ProductDetail();
                $__product_detail->product_id = $__product->id;
                $__product_detail->save();

                return response()->json([
                    'status' => 200,
                    'messages' => 'success',
                ]);
            }
            return response()->json([
                'status' => 202,
                'messages' => 'Validator error',
            ]);
       } catch (\Throwable $th) {
        return response()->json([
            'status' => 201,
            'messages' => 'error',
        ]);
       }
    }
}
