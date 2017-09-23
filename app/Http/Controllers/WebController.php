<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Carbon\Carbon;

class WebController extends Controller
{
    /**
     * shop 入口页
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function shop()
    {
        $oauthUser = session('wechat.oauth_user');

        if ($oauthUser) {
            // 准备更新或新建用户资料
            $userData = $oauthUser->original;
            $userData['last_online_at'] = Carbon::now();

            // 有就更新，没有就新建
            $user = User::updateOrCreate(['openid' => $oauthUser->id], $userData);
        } else {
            $user = null;
        }

        return response()->view('shop.index', [
            'user' => $user
        ])->cookie('user_id', $user->id ?? null);
    }

    /**
     * admin 入口页
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function admin()
    {
        return view('admin.index');
    }
}
