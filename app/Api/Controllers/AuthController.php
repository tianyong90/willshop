<?php

namespace App\Api\Controllers;

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
                return $this->response->error('invalid credentials', 401);
            }
        } catch (JWTException $e) {
            return $this->response->error('could not create token', 500);
        }

        // 返回生成的 token
        return response()->json(compact('token'));
    }

    /**
     * 注册
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
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
            return $this->response->error($validator->messages()->first(), 401);
        }

        try {
            $newUser = User::create($data);

            $token = JWTAuth::fromUser($newUser);

            // 返回生成的 token
            return response()->json(compact('token'));
        } catch (\Exception $e) {
            return $this->response->error('system error', 500);
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
                return $this->response->error('user_not_found', 404);
            }
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return $this->response->error('token_expired', $e->getStatusCode());
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return $this->response->error('token_invalid', $e->getStatusCode());
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return $this->response->error('token_absent', $e->getStatusCode());
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
                return $this->response->error('user_not_found', 404);
            }
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return $this->response->error('token_expired', $e->getStatusCode());
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return $this->response->error('token_invalid', $e->getStatusCode());
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return $this->response->error('token_absent', $e->getStatusCode());
        }

        if (!password_verify($data['oldPassword'], $user['password'])) {
            return $this->response->error('oldpassword don\'t match', 400);
        }

        if ($data['password'] !== $data['password_confirmation']) {
            return $this->response->error('password confirmation failed.', 400);
        }

        $user['password'] = bcrypt($data['password']);

        $user = $user->save();

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('token'));
    }
}
