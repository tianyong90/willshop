<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Carbon\Carbon;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use SoftDeletes, HasApiTokens, Notifiable, HasRoles;

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

    /**
     * 根据用户名查找用户，用于 passport 登录验证逻辑
     *
     * @param $username
     *
     * @return \Illuminate\Database\Eloquent\Model|null|static
     */
    public function findForPassport($username)
    {
        return $this->where('name', $username)->first();
    }
}
