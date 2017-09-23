<?php

namespace App\Http\Controllers\Api;

use App\Address;
use App\Cart;
use App\Order;
use App\OrderItem;
use App\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
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
    public function list(Request $request)
    {
        $status = $request->input('status', 'all');

        $orders = $this->order->where('user_id', $this->currentUser->id)->where(function ($query) use ($status) {
            if ($status !== 'all') {
                $query->where('status', $status);
            }
        })->with('order_items', 'order_items.product')->orderBy('created_at', 'DESC')->paginate();

        return response()->json(compact('orders'));
    }

    /**
     * 订单详情
     *
     * @param string $orderNumber
     *
     * @return mixed
     */
    public function show($orderNumber)
    {
        $order = $this->order->where('number', $orderNumber)->where('user_id', $this->currentUser->id)->with('order_items', 'order_items.product')->first();

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
        // 选中的购物车项
        $cartIds = $request->input('cartIds');
        $addressId = $request->input('addressId');
        $remark = $request->input('remark');

        if (count($cartIds) === 0) {
            return response('未选择结算项目', 400);
        }

        // 结算相关购物车项目
        $carts = Cart::whereIn('id', $cartIds)->with('product')->get();

        $products = $carts->pluck('product');

        $address = Address::find($addressId);

        $order = new Order([
            'user_id' => $this->currentUser->id,
            'total_fee' => $carts->reduce(function ($carry, $item) {
                return $carry + ($item->amount * $item->product->price);
            }),
            'amount' => $products->sum('amount'),
            'consumer_name' => $address->name,
            'consumer_mobile' => $address->mobile,
            'address' => $address->address,
            'postcode' => $address->postcode,
            'remark' => $remark,
        ]);

        $items = [];

        foreach ($carts as $cart) {
            $items[] = new OrderItem([
                'order_id' => $order->id,
                'product_id' => $cart->product->id,
                'amount' => $cart->amount,
                'unit_price' => $cart->product->price,
            ]);
        }

        $order = DB::transaction(function () use ($order, $items) {
            $order->save();
            $order->order_items()->saveMany($items);

            return $order;
        });

        // 结算完成后相关购物车荐状态更新
        Cart::whereIn('id', $cartIds)->update(['checkouted_at' => Carbon::now()]);

        return response()->json(['order_no' => $order->number]);
    }

    /**
     * 取消订单
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function cancel($id)
    {
        try {
            Order::where('user_id', $this->currentUser->id)->where('id', $id)->update(['status' => 'canceled']);

            return response()->json(['info' => '取消成功']);
        } catch (\Exception $e) {
            return response($e->getMessage(), 500);
        }
    }

    /**
     * 删除订单
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            Order::where('user_id', $this->currentUser->id)->where('id', $id)->delete();

            return response()->json(['info' => '删除成功']);
        } catch (\Exception $e) {
            return response($e->getMessage(), 500);
        }
    }
}
