<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use RajaOngkir;
class OngkirController extends Controller
{
    public function view(Request $request)
    {

        if ($request->query('province_id'))
        {
            $_get_province = RajaOngkir::province()->get();
            $_get_city = RajaOngkir::find(['province_id' => $request->province_id])->city()->get();
        }

        return array($_get_province, $_get_city);
    }
    public function cekOngkir(Request $request)
    {
        $__city             = $request->city;
        $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => "https://api.rajaongkir.com/starter/cost",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => "origin=364&destination=" . $__city . "&weight=1700&courier=jne",
        CURLOPT_HTTPHEADER => array(
        "content-type: application/x-www-form-urlencoded",
        "key: a7de2ed772ca4fc00eddad32d2544615"
        ),
        ));
        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);
        if ($err) {
        echo "cURL Error #:" . $err;
        } else {
        return $response;
        }
    }
}
