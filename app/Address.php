<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Address
 *
 * @property-read \App\User $user
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Address onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Query\Builder|\App\Address withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Address withoutTrashed()
 * @mixin \Eloquent
 * @property int $id
 * @property int $user_id 用户ID
 * @property string|null $name 收货人
 * @property string|null $mobile 手机号
 * @property string|null $postcode 邮编
 * @property string|null $province 省
 * @property string|null $city 市
 * @property string|null $area 区
 * @property string|null $address 详细地址
 * @property bool $is_default 是默认地址
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereArea($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereIsDefault($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereMobile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address wherePostcode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereProvince($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereUserId($value)
 */
class Address extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'name',
        'mobile',
        'postcode',
        'province',
        'city',
        'area',
        'address',
        'is_default',
    ];

    protected $casts = [
        'is_default' => 'boolean',
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
}
