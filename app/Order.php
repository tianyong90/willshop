<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;

    CONST STATUS_NEED_TO_PAY = 'need_to_pay';
    CONST STATUS_PAID = 'paid';
    CONST STATUS_DELIVERED = 'delivered';
    CONST STATUS_FINISHED = 'finished';
    CONST STATUS_CANCELED = 'canceled';

    protected $fillable = [
        'number',
        'user_id',
        'total_fee',
        'status',
        'consumer_name',
        'consumer_mobile',
        'address',
        'post_code',
        'remark',
    ];

    /**
     * 所属用户
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * 订单相关的项
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function order_items()
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }
}
