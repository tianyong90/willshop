<?php

namespace App\Http\Controllers\AdminApi;

use App\Repositories\OrderRepository;
use App\Repositories\ProductRepository;
use App\Repositories\UserRepository;

class StatsController extends BaseApiController
{
    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @var OrderRepository
     */
    private $orderRepository;

    /**
     * @var ProductRepository
     */
    private $productRepository;

    /**
     * StatsController constructor.
     *
     * @param UserRepository    $userRepository
     * @param OrderRepository   $orderRepository
     * @param ProductRepository $productRepository
     */
    public function __construct(
        UserRepository $userRepository,
        OrderRepository $orderRepository,
        ProductRepository $productRepository
    ) {
        parent::__construct();

        $this->userRepository = $userRepository;
        $this->orderRepository = $orderRepository;
        $this->productRepository = $productRepository;
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
