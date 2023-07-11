<?php

namespace App\Http\Controllers;

use App\Models\Checkout;
use App\Models\Product;
use App\Models\Report;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    public function orderNotif()
    {
        $__checkout         = Checkout::where('status', 'unpaid')->get();
        return $__checkout;
    }
    function productReport() {
        $__product          = Report::join('tb_product', 'tb_product.id', 'tb_report.product_id')
                            ->get(['tb_product.*', 'tb_report.sales_amount']);
        return $__product;
    }
    function productReportUpdate(Request $request, $id) {
        try {
            $__product              = Product::find($id);
            $__report               = Report::where('product_id', $__product->id)->first();
            $__report->sales_amount = $request->sales_amount;
            $__report->update();
            $__product->title       = $request->title;
            $__product->slug        = Str::slug($request->title);
            $__product->desc        = $request->desc;
            $__product->price       = $request->price;
            $__product->stock       = $request->stock;
            $__product->category_id = $request->category_id;
            $__product->update();
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
    public function orderReport()
    {
        $__checkout         = Checkout::join('tb_product', 'tb_product.id', 'tb_checkout.product_id')
                    ->join('tb_product_discount', 'tb_product_discount.product_id', 'tb_product.id')
                    ->join('users', 'users.id', 'tb_checkout.user_id')
                    ->where('tb_checkout.status','finish')
                    ->get([
                        'tb_checkout.*',
                        'users.name',
                        'tb_product.slug',
                        'tb_product.title',
                        'tb_product.desc',
                        'tb_product.stock',
                        'tb_product.price',
                        'tb_product.image',
                        'tb_product_discount.special_price'
                    ]);

        return $__checkout;
    }
    public function orderProcessGet()
    {

        $__get_all_user         = User::join('tb_checkout', 'tb_checkout.user_id', 'users.id')->get(['users.*']);
        $__get_all_checkout     = Checkout::all();
        $__get_all_user_temp    = array();

        foreach ($__get_all_checkout as $_get_all_checkout)
        {
            foreach($__get_all_user->where('id', $_get_all_checkout->user_id) as $_get_all_user)
            {
                array_push($__get_all_user_temp, $_get_all_user);
            }
        }
        $__user_filter_unique = array_unique($__get_all_user_temp);

        $__unpaid         = Checkout::join('tb_product', 'tb_product.id', 'tb_checkout.product_id')
        ->join('tb_product_discount', 'tb_product_discount.product_id', 'tb_product.id')
        ->join('users', 'users.id', 'tb_checkout.user_id')
        ->get(['tb_checkout.*', 'tb_product.title', 'tb_product.price', 'tb_product.image', 'tb_product_discount.special_price', 'users.name']);

        return array(array_values($__user_filter_unique), $__unpaid);
    }
    public function detailCheckout($username)
    {
        $__unpaid         = Checkout::join('tb_product', 'tb_product.id', 'tb_checkout.product_id')
        ->join('tb_product_discount', 'tb_product_discount.product_id', 'tb_product.id')
        ->join('users', 'users.id', 'tb_checkout.user_id')
        ->where('users.name', $username)
        ->get(['tb_checkout.*', 'tb_product.title', 'tb_product.price', 'tb_product.image', 'tb_product_discount.special_price', 'users.name']);
        $__filter_total_temp = array();
        $__filter_date_temp = array();
        $__filter_courier_temp = array();
        $__filter_address_temp = array();
        foreach ($__unpaid as $_cart)
            {
               array_push($__filter_date_temp, $_cart->created_at . '//' . $_cart->status);
               array_push($__filter_total_temp, $_cart->total);
               array_push($__filter_address_temp, $_cart->city  . ', '. $_cart->province . '. '. $_cart->address);
               array_push($__filter_courier_temp, $_cart->created_at . '//'. $_cart->courier .' (' . $_cart->courier_t . ")");

            }
        $__filter_date = array_unique(array_values($__filter_date_temp));
        $__filter_total = array_unique(array_values($__filter_total_temp));
        $__filter_address = array_unique(array_values($__filter_address_temp));
        $__filter_couerir = array_unique(array_values($__filter_courier_temp));
        return array(
                $__unpaid,
                array_values($__filter_total),
                array_values($__filter_date),
                array_values($__filter_address),
                array_values($__filter_couerir)
            );
    }
    public function checkoutProcess($created_at)
    {
       try {
            $__checkout         = Checkout::where('created_at', $created_at)->get();
            foreach ($__checkout as $_checkout)
            {
                $_product = Product::find($_checkout->product_id);
                $_product->stock = $_product->stock - $_checkout->quantity;
                $_product->update();
                $_checkout->status = 'paid';
                $_checkout->update();
            }
            return response()->json([
                'status' => 200,
                'message' => 'Success'
            ]);
       } catch (\Throwable $th) {
        return response()->json([
            'status' => 201,
            'message' => 'error'
        ]);
       }
    }
    public function checkoutConfirm($created_at)
    {
       try {
            $__checkout         = Checkout::where('created_at', $created_at)->get();
            foreach ($__checkout as $_checkout)
            {
                $_checkout->status = 'confirmed';
                $_checkout->update();
            }
            return response()->json([
                'status' => 200,
                'message' => 'Success'
            ]);
       } catch (\Throwable $th) {
        return response()->json([
            'status' => 201,
            'message' => 'error'
        ]);
       }
    }
    public function checkoutSending($created_at)
    {
       try {
            $__checkout         = Checkout::where('created_at', $created_at)->get();
            foreach ($__checkout as $_checkout)
            {
                $_checkout->status = 'processed';
                $_checkout->update();
            }
            return response()->json([
                'status' => 200,
                'message' => 'Success'
            ]);
       } catch (\Throwable $th) {
        return response()->json([
            'status' => 201,
            'message' => 'error'
        ]);
       }
    }

}
