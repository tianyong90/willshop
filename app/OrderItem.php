<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\OrderItem
 *
 * @property-read \App\Order $order
 * @property-read \App\Product $product
 * @mixin \Eloquent
 * @property int $id
 * @property int $order_id 关联订单ID
 * @property int $product_id 关联产品ID
 * @property float $unit_price 单价
 * @property int $amount 数量
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderItem whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderItem whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderItem whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderItem whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderItem whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderItem whereUpdatedAt($value)
 */
class OrderItem extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
        'unit_price',
        'amount',
    ];

    /**
     * 所属订单
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id');
    }

    /**
     * 对应商品
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function product()
    {
        return $this->hasOne(Product::class, 'id', 'product_id');
    }
}
