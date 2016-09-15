<?php

namespace App\Api\Controllers;

use App\Cart;
use App\Product;
use Illuminate\Http\Request;
use Auth;

class CartController extends BaseController
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
     * 购物车列表
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function index()
    {
        return $this->cart->with('product')->get();
    }

    /**
     * 加入购物车
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $where['user_id'] = Auth::id();
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
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
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
