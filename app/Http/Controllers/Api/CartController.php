<?php

namespace App\Http\Controllers\Api;

use App\Cart;
use App\Product;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

class CartController extends Controller
{
    /**
     * @var Cart
     */
    private $cart;

    /**
     * @var Product
     */
    private $product;

    /**
     * CartController constructor.
     *
     * @param Cart    $cart
     * @param Product $product
     */
    public function __construct(Cart $cart, Product $product)
    {
        $this->cart = $cart;
        $this->product = $product;
    }

    /**
     * 加入购物车
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(Request $request)
    {
        $where['user_id'] = 1;
        $where['product_id'] = $request->input('productId');

        if ($cart = $this->cart->where($where)->first()) {
            $cart->increment('amount', $request->input('amount'));
        } else {
            $data = array_merge($where, ['amount' => $request->input('amount')]);

            $this->cart->create($data);
        }

        return response()->json(['info' => '添加成功']);
    }

    /**
     * 购物车列表
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function lists()
    {
        return $this->cart->with('product')->get();
    }

    /**
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function delte($id)
    {
        $this->cart->where('id', $id)->delete();

        return response()->json(['info' => '删除成功']);
    }

    /**
     * 获取购物车中商品总数
     *
     * @return mixed
     */
    public function getProductAmount()
    {
        $amount = $this->cart->sum('amount');

        return $amount;
    }
}
