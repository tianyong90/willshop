<?php

namespace App\Http\Controllers\AdminApi;

use App\Cart;
use App\Order;
use App\OrderItem;
use App\Product;
use Illuminate\Http\Request;
use Auth;
use DB;

class OrderController extends BaseApiController
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
        parent::__construct();

        $this->order = $order;
        $this->orderItem = $orderItem;
        $this->product = $product;
        $this->cart = $cart;
    }

    /**
     * 订单列表数据
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function list()
    {
        $orders = $this->order->paginate();

        return response()->json(compact('orders'));
    }

    /**
     * 订单详情
     *
     * @param $id
     *
     * @return mixed
     */
    public function show($id)
    {
        $order = $this->order->findOrFail($id);

        return response()->json(compact('order'));
    }

    /**
     * 结算，创建订单
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {

    }

    /**
     * 删除订单
     *
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        $this->order->where('id', $id)->delete();

        return response()->json(['info' => '删除成功']);
    }
}
