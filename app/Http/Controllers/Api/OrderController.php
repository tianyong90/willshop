<?php

namespace App\Http\Controllers\Api;

use App\Cart;
use App\Order;
use App\OrderItem;
use App\Product;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    /**
     * @var Order
     */
    private $order;

    /**
     * @var OrderItem
     */
    private $orderItem;

    /**
     * @var Product
     */
    private $product;

    /**
     * @var Cart
     */
    private $cart;

    /**
     * OrderController constructor.
     *
     * @param Order     $order
     * @param OrderItem $orderItem
     * @param Product   $product
     * @param Cart      $cart
     */
    public function __construct(Order $order, OrderItem $orderItem, Product $product, Cart $cart)
    {
        $this->order = $order;
        $this->orderItem = $orderItem;
        $this->product = $product;
        $this->cart = $cart;
    }


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
        $selectedCarts = $request->input('selectedCarts');

        dump($selectedCarts);

//        return response()->json(['info' => '添加成功']);
    }
}
