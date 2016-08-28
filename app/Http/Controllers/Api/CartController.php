<?php

namespace App\Http\Controllers\Api;

use App\Cart;
use App\Product;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

class CartController extends Controller
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
        $data['user_id'] = 1;
        $data['product_id'] = $productId;
        $data['amount'] = 1;

        Cart::create($data);

        return response()->json(['info' => '添加成功']);
    }

    /**
     * 购物车列表
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function lists()
    {
        return Cart::with('product')->get();
    }
}
