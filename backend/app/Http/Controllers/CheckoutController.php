<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Checkout;
use App\Models\City;
use App\Models\Province;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use RajaOngkir;

class CheckoutController extends Controller
{
    public function view(Request $request)
    {
        if ($request->has('unpaid'))
        {
            $__unpaid         = Checkout::join('tb_product', 'tb_product.id', 'tb_checkout.product_id')
            ->join('tb_product_discount', 'tb_product_discount.product_id', 'tb_product.id')
            ->join('users', 'users.id', 'tb_checkout.user_id')
            ->where('tb_checkout.user_id', Auth::id())
            ->where('tb_checkout.status', 'unpaid')
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
        if ($request->has('confirmed'))
        {
            $__unpaid         = Checkout::join('tb_product', 'tb_product.id', 'tb_checkout.product_id')
            ->join('tb_product_discount', 'tb_product_discount.product_id', 'tb_product.id')
            ->join('users', 'users.id', 'tb_checkout.user_id')
            ->where('tb_checkout.user_id', Auth::id())
            ->where('tb_checkout.status', 'paid')
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
        if ($request->has('order-send'))
        {
            $__unpaid         = Checkout::join('tb_product', 'tb_product.id', 'tb_checkout.product_id')
            ->join('tb_product_discount', 'tb_product_discount.product_id', 'tb_product.id')
            ->join('users', 'users.id', 'tb_checkout.user_id')
            ->where('tb_checkout.user_id', Auth::id())
            ->where('tb_checkout.status', 'processed')
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
        if ($request->has('order-finish'))
        {
            $__unpaid         = Checkout::join('tb_product', 'tb_product.id', 'tb_checkout.product_id')
            ->join('tb_product_discount', 'tb_product_discount.product_id', 'tb_product.id')
            ->join('users', 'users.id', 'tb_checkout.user_id')
            ->where('tb_checkout.user_id', Auth::id())
            ->where('tb_checkout.status', 'finish')
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

    }
    public function takeOrders($created_at)
    {
       try {
            $__checkout         = Checkout::where('created_at', $created_at)
                                    ->where('user_id', Auth::id())
                                    ->get();
            foreach ($__checkout as $_checkout)
            {
                $_checkout->status = 'finish';
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
    public function delete($created_at)
    {
       try {
            $__unpaid = Checkout::where('status', 'unpaid')
                                ->where('user_id', Auth::id())
                                ->where('created_at', $created_at)
                                ->get();
            foreach($__unpaid as $_unpaid)
            {
                $_unpaid->delete();
            }
            return response()->json([
                'status' => 200,
                'messaage' => 'success'
            ]);
       } catch (\Throwable $th) {
            return response()->json([
                'status' => 201,
                'message' => 'error'
            ], 201);
       }
    }
    public function store(Request $request)
    {
        $__cart                 = Cart::where('user_id', Auth::id())->get();
        try {
            foreach ($__cart as $_cart)
        {
            $_get_province = Province::where('province_id', $request->province)->first();
            $_get_city = City::where('city_id', $request->city)->first();

            $__checkout             = new Checkout();
            $__checkout->product_id = $_cart->product_id;
            $__checkout->notes      = $_cart->notes;
            $__checkout->quantity   = $_cart->quantity;
            $__checkout->subtotal   = $_cart->subtotal;
            $__checkout->total      = $request->total;
            $__checkout->courier    = $request->courier;
            $__checkout->courier_t  = $request->courier_t;
            $__checkout->status     = 'unpaid';
            $__checkout->province   = $_get_province->province;
            $__checkout->city       = $_get_city->city_name;
            $__checkout->address    = $request->address;
            $__checkout->user_id    = Auth::id();
            $__checkout->save();
            $_cart->delete();
        }
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
