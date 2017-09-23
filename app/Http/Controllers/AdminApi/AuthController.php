<?php

namespace App\Http\Controllers\AdminApi;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use App\User;
use Auth;
use EasyWeChat;

class AutHController extends BaseApiController
{
    /**
     * 登录授权
     *
     * @param Request $request
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function authenticate(Request $request)
    {
        // 登录信息
        $credentials = $request->only('name', 'password');

        $http = new Client();

        $response = $http->post('http://localhost:8030/oauth/token', [
            'form_params' => [
                'grant_type' => 'password',
                'client_id' => config('app.password_oauth_client.id'),
                'client_secret' => config('app.password_oauth_client.secret'),
                'username' => $credentials['name'],
                'password' => $credentials['password'],
                'scope' => '*',
            ]
        ]);

        // 返回生成的 token
        return $response;
    }

    /**
     * 获取当前登录的用户
     */
    public function getAuthenticatedUser()
    {
        $user = Auth::user();

        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
    }

    /**
     * 修改密码
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function updatePassword(Request $request)
    {
//        $data = $request->all();
//
//        try {
//            if (!$user = JWTAuth::parseToken()->authenticate()) {
//                return response('user_not_found', 404);
//            }
//        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
//            return response('token_expired', $e->getStatusCode());
//        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
//            return response('token_invalid', $e->getStatusCode());
//        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
//            return response('token_absent', $e->getStatusCode());
//        }
//
//        if (!password_verify($data['oldPassword'], $user['password'])) {
//            return response('oldpassword don\'t match', 400);
//        }
//
//        if ($data['password'] !== $data['password_confirmation']) {
//            return response('password confirmation failed.', 400);
//        }
//
//        $user['password'] = bcrypt($data['password']);
//
//        try {
//            $user->save();
//
//            return response('修改成功');
//        } catch (\Exception $e) {
//            return response($e->getMessage(), 500);
//        }
    }

    public function getLoginQrcode()
    {
        $officialAccount = EasyWeChat::officialAccount();

        $result = $officialAccount->qrcode->temporary('login_'.time(), 10000);

        return $result;
    }
}
