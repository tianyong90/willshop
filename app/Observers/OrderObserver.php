<?php

namespace App\Observers;

use App\Order;

/**
 * Order observer.
 */
class OrderObserver
{
    /**
     * Creating Order
     *
     * @param Order $order
     */
    public function creating(Order $order)
    {
        // 创建订单时生成订单号
        $order->number = date('YmdHis').\Str::random(5);
    }

    /**
     * Order created.
     *
     * @param Order $order
     */
    public function created(Order $order)
    {
        //
    }

    /**
     *
     *
     * @param Order $order
     */
    public function updating(Order $order)
    {
        //
    }

    /**
     * Saving Order.
     *
     * @param Order $order
     */
    public function saving(Order $order)
    {
        //
    }

    /**
     * Order Saved.
     *
     * @param Order $order
     */
    public function saved(Order $order)
    {
        //
    }
}
