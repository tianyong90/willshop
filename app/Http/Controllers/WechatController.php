<?php

namespace App\Http\Controllers;

use App\Events\WechatScanLogin;
use EasyWeChat\Factory;
use Illuminate\Http\Request;
use EasyWeChat;
use App\User;

class WechatController extends Controller
{
    public function serve()
    {
        $app = app('wechat.official_account');
        $app->server->push(function ($message) {
            \Log::debug($message);

            event(new WechatScanLogin('token', 'qrcodeLoginChannel'));

            return "欢迎关注 WILLSHOP！";
        });

        $app->server->push(function ($message) {
            if ($message['Event'] === 'SCAN') {
                event(new WechatScanLogin('token', 'qrcodeLoginChannel'));

                //                $user = User::where('openid', $message['FromUserName'])->first();
//
//
//                if ($user && User::hasRole('admin')) {
//                    event(new WechatScanLogin('token', 'qrcodeLoginChannel'));
//
//                    return '登录成功';
//                } else {
//                    return '用户不存在或者无登录权限';
//                }
            }
        }, EasyWeChat\Kernel\Messages\Message::EVENT);

        return $app->server->serve();
    }
}
