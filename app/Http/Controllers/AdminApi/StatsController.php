<?php

namespace App\Http\Controllers\AdminApi;

class StatsController extends BaseApiController
{
    /**
     * StatsController constructor.
     */
    public function __construct(
    ) {
        parent::__construct();
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // TODO
//        $brands = $this->userRepository->;

        $userCount = 1;
        $productCount = 2;
        $orderCount = 3;

        return response()->json(compact('userCount', 'productCount', 'orderCount'));
    }
}
