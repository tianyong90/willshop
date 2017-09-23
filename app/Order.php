<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Order
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\OrderItem[] $order_items
 * @property-read \App\User $user
 * @mixin \Eloquent
 * @property int $id
 * @property string $number 订单号
 * @property int $user_id 所属会员
 * @property int $total_fee 总费用
 * @property string $status 订单状态
 * @property string $consumer_name 收货人姓名
 * @property string $consumer_mobile 收货人手机
 * @property string $address 收货地址
 * @property string $post_code 邮编
 * @property string $remark 用户备注
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereConsumerMobile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereConsumerName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order wherePostCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereRemark($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereTotalFee($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereUserId($value)
 */
class Order extends Model
{
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
