<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191|min:4',
            'email' => 'required|email|max:191',
            'no_telp' => 'required|max:20',
            'password' => 'required|min:4',
            'password_confirmation' => 'required|min:4',
        ]);
        $user         = User::where('email', $request->email)->first();

        $__no_telp = str_replace(" ","",$request->no_telp);
        $__no_telp = str_replace("(","",$request->no_telp);
        $__no_telp = str_replace(")","",$request->no_telp);
        $__no_telp = str_replace(".","",$__no_telp);
        if(!preg_match('/[^+0-9]/',trim($__no_telp))){
            if(substr(trim($__no_telp), 0, 1)=='0'){
                $_no_telp = trim($__no_telp);
            }
            else if(substr(trim($__no_telp), 0, 3)=='+62'){
                $_no_telp = '0'.substr(trim($__no_telp), 3);
            }
            else if(substr(trim($__no_telp), 0, 2)=='62'){
                $_no_telp = '0'.substr(trim($__no_telp), 2);
            }
        }
        if ($user) {
            return response()->json([
                'status' => 202,
                'validation_errors' => 'e-mail has been registered!',
            ]);
        }

            if ($validator->fails()) {
                return response()->json([
                    'status' => 201,
                    'validation_errors' => $validator->errors(),
                ]);
            } else {
                if ($request->password === $request->password_confirmation) {

                    $user = User::create([
                        'name' => $request->name,
                        'email' => $request->email,
                        'no_telp' => $_no_telp,
                        'password' => Hash::make($request->password),
                    ]);
                    $user->addRole('user');

                $token = $user->createToken($user->email . '_Token')->plainTextToken;
                return response()->json([
                    'status' => 200,
                    'id' => sha1('Marketplace-user->id' . $user->id),
                    'username' => $user->name,
                    'email' => $user->email,
                    'role' => sha1('Marketplace-user-role' . $user->roles[0]->name),
                    'token' => $token,
                    'message' => 'Logged In Successfully!',
                ]);

            }
            else{
                return response()->json([
                    'status' => 201,
                    'validation_errors' => 'Password not match!',
                ]);
            }
        }
    }
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|max:191',
            'password' => 'required|max:30|min:5',
        ]);
        if ($validator->fails()) {

            return response()->json([
                'status' => 202,
                'validation_error' => $validator->errors(),
            ]);
        } else {
            $user = User::where('email', $request->email)->first();

            if (!$user || Hash::check($request->email, $user->email)) {

                return response()->json([
                    'status' => 102,
                    'validation_error' => 'Your email is not registered!',
                ]);
            }

            if (!$user || !Hash::check($request->password, $user->password)) {

                return response()->json([
                    'status' => 101,
                    'validation_error' => 'Your password is wrong!',
                ]);
            }
            if ($user || !Hash::check($request->password, $user->password)) {
                $token = $user->createToken($user->email . '_Token')->plainTextToken;
                return response()->json([
                    'status' => 200,
                    'id' => sha1('Marketplace-user->id' . $user->id),
                    'username' => $user->name,
                    'email' => $user->email,
                    'role' => sha1('Marketplace-user-role' . $user->roles[0]->name),
                    'token' => $token,
                    'message' => 'Logged In Successfully!',
                ]);
            }
        }
    }
    public function logout()
    {
        Auth::user()->tokens()->each(function ($token, $key) {
            $token->delete();
        });
        return response()->json([
            'status' => 200,
            'message' => 'Logout successfully',
        ]);

    }
}
