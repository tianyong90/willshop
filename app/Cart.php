<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Cart
 *
 * @property-read \App\Product $product
 * @property-read \App\User $user
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Cart onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Query\Builder|\App\Cart withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Cart withoutTrashed()
 * @mixin \Eloquent
 * @property int $id
 * @property int $user_id 用户ID
 * @property int $product_id 产品ID
 * @property int $amount 数量
 * @property string|null $checkouted_at 结算时间
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Cart whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Cart whereCheckoutedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Cart whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Cart whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Cart whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Cart whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Cart whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Cart whereUserId($value)
 */
class Cart extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'product_id',
        'amount',
    ];

    /**
     * 所属用户
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * 商品
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function product()
    {
        return $this->hasOne(Product::class, 'id', 'product_id');
    }
}
