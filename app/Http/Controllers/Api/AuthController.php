<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\User;
use Validator;

class AutHController extends BaseController
{
    /**
     * 登录授权
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function authenticate(Request $request)
    {
        // 登录信息
        $credentials = $request->only('name', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response('invalid credentials', 401);
            }
        } catch (JWTException $e) {
            return response('could not create token', 500);
        }

        // 返回生成的 token
        return response()->json(compact('token'));
    }

    /**
     * 注册
     *
     * @param Request $request
     *
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\JsonResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function register(Request $request)
    {
        $data = $request->all();
        
        $rules = [
            'name' => 'required|min:3|max:20',
            'mobile' => 'required|min:1|max:12',
            'password' => 'required|confirmed',
        ];

        $validator = Validator::make($request->all(), $rules, [], \App\User::$aliases);

        if ($validator->fails()) {
            return response($validator->messages()->first(), 401);
        }

        try {
            $newUser = User::create($data);

            $token = JWTAuth::fromUser($newUser);

            // 返回生成的 token
            return response()->json(compact('token'));
        } catch (\Exception $e) {
            return response('system error', 500);
        }
    }

    /**
     * 获取当前登录的用户
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAuthenticatedUser(Request $request)
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response('user_not_found', 404);
            }
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response('token_expired', $e->getStatusCode());
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response('token_invalid', $e->getStatusCode());
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response('token_absent', $e->getStatusCode());
        }

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
        $data = $request->all();

        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response('user_not_found', 404);
            }
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response('token_expired', $e->getStatusCode());
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response('token_invalid', $e->getStatusCode());
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response('token_absent', $e->getStatusCode());
        }

        if (!password_verify($data['oldPassword'], $user['password'])) {
            return response('oldpassword don\'t match', 400);
        }

        if ($data['password'] !== $data['password_confirmation']) {
            return response('password confirmation failed.', 400);
        }

        $user['password'] = bcrypt($data['password']);

        try {
            $user->save();

            return response('修改成功');
        } catch (\Exception $e) {
            return response($e->getMessage(), 500);
        }
    }
}
