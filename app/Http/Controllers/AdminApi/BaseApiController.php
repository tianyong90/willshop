<?php

namespace App\Http\Controllers\AdminApi;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\ApiResponse;
use Illuminate\Support\Facades\Auth;

class BaseApiController extends Controller
{
    use ApiResponse;

    /**
     * @var \Illuminate\Contracts\Auth\Authenticatable|null
     */
    protected $currentUser;

    /**
     * BaseApiController constructor.
     */
    public function __construct()
    {
        $this->currentUser = Auth::guard('api')->user();
    }
}
