<?php

namespace App\Http\Controllers\Api;

use App\Order;
use App\Product;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    /**
     * 加入购物车
     *
     * @param $productId
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function add($productId)
    {
//        return Product::all();

        return response()->json(['info' => '添加成功']);
    }

    public function lists()
    {
        return Order::all();
    }

    public function checkout(Request $request)
    {
        \Log::info($request->all());

        return response()->json(['info' => '添加成功']);
    }
}
