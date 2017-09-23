<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Carbon\Carbon;
use Laratrust\Traits\LaratrustUserTrait;

/**
 * App\User
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Client[] $clients
 * @property-read string $location
 * @property-read string $sex
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-write mixed $subscribe_time
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Token[] $tokens
 * @mixin \Eloquent
 * @property int $id
 * @property string $name 用户名
 * @property string|null $avatar
 * @property string|null $mobile
 * @property string|null $email
 * @property string $password 密码
 * @property string $openid OPENID
 * @property string $nickname 昵称
 * @property string $remark 备注
 * @property string $language 语言
 * @property string $city 城市
 * @property string $province 省
 * @property string $country 国家
 * @property string $headimgurl 头像
 * @property int|null $unionid unionid
 * @property int|null $subscribe 是否已关注
 * @property int $groupid 粉丝组groupid
 * @property array $tagid_list 微信用户标签ID列表
 * @property \Carbon\Carbon|null $last_online_at 最后一次在线时间
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereAvatar($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereGroupid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereHeadimgurl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereLastOnlineAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereMobile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereNickname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereOpenid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereProvince($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereRemark($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereSex($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereSubscribe($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereSubscribeTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereTagidList($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUnionid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUpdatedAt($value)
 */
class User extends Authenticatable
{
    use LaratrustUserTrait;
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'avatar',
        'mobile',
        'email',
        'password',
        'openid',
        'nickname',
        'remark',
        'sex',
        'language',
        'city',
        'province',
        'country',
        'headimgurl',
        'unionid',
        'subscribe',
        'liveness',
        'subscribe_time',
        'groupid',
        'tagid_list',
        'last_online_at',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'api_token',
    ];

    protected $casts = [
        'tagid_list' => 'array',
    ];

    protected $appends = [
        'location',
    ];

    protected $dates = [
        'subscribe_time',
        'last_online_at',
    ];

    /**
     * 返回性别.
     *
     * @return string
     */
    public function getSexAttribute($sex)
    {
        return $sex == 1 ? '男' : '女';
    }

    /**
     * 返回位置信息.
     *
     * @return string
     */
    public function getLocationAttribute()
    {
        return $this->country.' '.$this->province.' '.$this->city;
    }

    public function setSubscribeTimeAttribute($value)
    {
        $this->attributes['subscribe_time'] = Carbon::createFromTimestamp($value);
    }

    /**
     * 用于表单验证时的字段名称提示.
     *
     * @var array
     */
    public static $aliases = [
        'name' => '用户名',
        'mobile' => '手机',
        'email' => '邮箱',
        'password' => '密码',
        'api_token' => 'apitoken',
    ];
}
