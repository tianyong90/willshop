<?php

namespace App\Http\Controllers\Api;

use App\Cart;
use App\Product;
use Illuminate\Http\Request;

class CartController extends BaseApiController
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
        parent::__construct();

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
        $carts = $this->cart->with('product')->whereNull('checkouted_at')->get();
        
        return response()->json(compact('carts'));
    }

    /**
     * 加入购物车
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $where['user_id'] = $this->currentUser->id;
        $where['product_id'] = $request->input('productId');
        $where['checkouted_at'] = null;

        if ($cart = $this->cart->where($where)->first()) {
            $cart->increment('amount', $request->input('amount'));
        } else {
            $data = array_merge($where, ['amount' => $request->input('amount')]);

            $this->cart->create($data);
        }

        return response()->json(['info' => '添加成功']);
    }

    /**
     * 删除.
     *
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $this->cart->destroy($id);

        return response()->json(['info' => '删除成功']);
    }

    /**
     * 获取购物车中商品总数
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getProductAmount()
    {
        $amount = $this->cart->whereNull('checkouted_at')->sum('amount');

        return response()->json(compact('amount'));
    }

    /**
     * 更新某一条购物车记录对应的商品数量
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateAmount(Request $request)
    {
        $id = $request->input('id');
        $amount = $request->input('amount');

        $amount = $this->cart->where(['id' => $id])->update(['amount' => $amount]);

        return response()->json(compact('amount'));
    }
}
