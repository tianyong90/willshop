<?php

namespace App\Http\Controllers\AdminApi;

use Carbon\Carbon;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Client;
//use Socialite;

use Illuminate\Http\Request;
use App\User;
use EasyWeChat;
use Validator;

class AuthenticateController extends BaseApiController
{
    use AuthenticatesUsers;

    /**
     * AuthenticateController constructor.
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 用于登录验证的用户名字段
     *
     * @return string
     */
    public function username()
    {
        return 'name';
    }

    /**
     * 登录
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response|mixed
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|exists:users',
            'password' => 'required|between:5,32',
        ]);

        if ($validator->fails()) {
            $request->request->add([
                'errors' => $validator->errors()->toArray(),
                'code' => 401,
            ]);

            return $this->sendFailedLoginResponse($request);
        }

        $credentials = $this->credentials($request);

        if ($this->guard('api')->attempt($credentials, $request->has('remember'))) {
            return $this->sendLoginResponse($request);
        }

        return $this->setStatusCode(401)->failed('登录失败');
    }

    /**
     * 退出登录
     *
     * @param Request $request
     *
     * @return mixed
     */
    public function logout(Request $request)
    {
        if (Auth::guard('api')->check()) {
            Auth::guard('api')->user()->token()->revoke();
        }

        return $this->message('退出登录成功');
    }

    /**
     * TODO: 第三方登录
     *
     * @param $driver
     */
    public function redirectToProvider($driver)
    {
//        if (!in_array($driver, ['qq', 'wechat'])) {
//
//            throw new NotFoundHttpException;
//        }
//
//        return Socialite::driver($driver)->redirect();
    }

    /**
     * TODO: 第三方登录回调
     *
     * @param $driver
     */
    public function handleProviderCallback($driver)
    {
//        $user = Socialite::driver($driver)->user();
//
//        $openId = $user->id;
//
//        // 第三方认证
//        $db_user = User::where('xxx', $openId)->first();
//
//        if (empty($db_user)) {
//
//            $db_user = User::forceCreate([
//                'phone' => '',
//                'xxUnionId' => $openId,
//                'nickname' => $user->nickname,
//                'head' => $user->avatar,
//            ]);
//
//        }
//
//        // 直接创建token
//
//        $token = $db_user->createToken($openId)->accessToken;
//
//        return $this->success(compact('token'));
    }

    /**
     * 调用认证接口获取授权码
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    protected function authenticateClient(Request $request)
    {
        $credentials = $this->credentials($request);

        // 个人感觉通过.env配置太复杂，直接从数据库查更方便
        $passwordClient = Client::query()->where('password_client', 1)->latest()->first();

        $request->request->add([
            'grant_type' => 'password',
            'client_id' => $passwordClient->id,
            'client_secret' => $passwordClient->secret,
            'username' => $credentials[$this->username()],
            'password' => $credentials['password'],
            'scope' => '',
        ]);

        $proxy = Request::create(
            'oauth/token',
            'POST'
        );

        $response = \Route::dispatch($proxy);

        return $response;
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    protected function authenticated(Request $request)
    {
        return $this->authenticateClient($request);
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    protected function sendLoginResponse(Request $request)
    {
        $this->clearLoginAttempts($request);

        return $this->authenticated($request);
    }

    /**
     * @param Request $request
     *
     * @return mixed
     */
    protected function sendFailedLoginResponse(Request $request)
    {
        $msg = $request['errors'];
        $code = $request['code'];

        return $this->setStatusCode($code)->failed($msg);
    }

    /**
     * 微信临时二维码，用于扫码登录
     *
     * @return mixed
     */
    public function getLoginQrcode()
    {
        $officialAccount = EasyWeChat::officialAccount();

        $result = $officialAccount->qrcode->temporary('login_'.time(), 10000);

        return $result;
    }

    /**
     * 当前登录用户
     *
     * @return User|\Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function getAuthenticatedUser()
    {
        $user = $this->guard('api')->user();

        return response()->json(compact('user'));
    }
}
