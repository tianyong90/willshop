<?php

namespace App\Http\Controllers\AdminApi;

use App\Coupon;
use Illuminate\Http\Request;

class CouponController extends BaseApiController
{
    /**
     * @var Coupon
     */
    private $coupon;

    /**
     * CouponController constructor.
     *
     * @param Coupon $coupon
     */
    public function __construct(Coupon $coupon)
    {
        parent::__construct();

        $this->coupon = $coupon;
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function list()
    {
        $coupons = $this->coupon->paginate();

        return response()->json(compact('coupons'));
    }

    /**
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $coupon = $this->coupon->findOrFail($id);

        return response()->json(compact('coupon'));
    }

    /**
     * @param Request $request
     */
    public function store(Request $request)
    {

    }

    /**
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function delete($id)
    {
        $this->coupon->where('id', $id)->delete();

        return response()->json(['info' => '删除成功']);
    }
}
