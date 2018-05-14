<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\ApiResponse;
use Crypt;
use App\User;

class BaseApiController extends Controller
{
    use ApiResponse;

    /**
     * @var mixed
     */
    protected $currentUser;

    /**
     * BaseApiController constructor.
     */
    public function __construct()
    {
        // 请求头里的 user_id
        $userId = Crypt::decrypt(\Request::cookie('user_id'));

        if ($userId && is_numeric($userId)) {
            $this->currentUser = User::find($userId);
        }
    }


}
