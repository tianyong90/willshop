<?php

namespace Api\Controllers;

use App\User;
use Dingo\Api\Facade\API;
use Illuminate\Http\Request;
use Api\Requests\UserRequest;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends BaseController
{
    public function me(Request $request)
    {
        return JWTAuth::parseToken()->authenticate();
    }

    public function authenticate(Request $request)
    {
        // grab credentials from the request
        $credentials = $request->only('email', 'password');

        try {
            // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // all good so return the token
        return response()->json(compact('token'));
    }

    public function validateToken() 
    {
        // Our routes file should have already authenticated this token, so we just return success here
        return API::response()->array(['status' => 'success'])->statusCode(200);
    }

    public function register(UserRequest $request)
    {
        $newUser = [
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => bcrypt($request->get('password')),
        ];
        $user = User::create($newUser);
        $token = JWTAuth::fromUser($user);

        return response()->json(compact('token'));
    }
}