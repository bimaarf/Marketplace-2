<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function view()
    {
        $__category = Category::all();
        return $__category;
    }
    public function update(Request $request, $id)
    {
        try {
            $_category  = Category::where('name', $request->category_name)->get();
            if (count($_category) > 0 )
            {
                return response()->json([
                    'status' => 202,
                    'message' => 'exist'
                ], 202);
            }
            $__category = Category::find($id);
            $__category->name = $request->category_name;
            $__category->update();
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
    public function store(Request $request)
    {
        try {
            $_category  = Category::where('name', $request->category_name)->get();
            if (count($_category) > 0 )
            {
                return response()->json([
                    'status' => 202,
                    'message' => 'exist'
                ], 202);
            }
            $__category = new Category();
            $__category->name = $request->category_name;
            $__category->save();
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
    public function delete($id)
    {
        try {
            $__category = Category::find($id);
            $__category->delete();
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
