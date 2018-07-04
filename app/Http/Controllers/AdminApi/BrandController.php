<?php

namespace App\Http\Controllers\AdminApi;

use App\Brand;
use Illuminate\Http\Request;

class BrandController extends BaseApiController
{
    /**
     * @var Brand
     */
    private $brand;

    /**
     * BrandController constructor.
     *
     * @param Brand $brand
     */
    public function __construct(Brand $brand)
    {
        parent::__construct();

        $this->brand = $brand;
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function list()
    {
        $brands = $this->brand->paginate();

        return response()->json(compact('brands'));
    }

    /**
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $brand = $this->brand->findOrFail($id);

        return response()->json(compact('brand'));
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
        $this->brand->where('id', $id)->delete();

        return response()->json(['info' => '删除成功']);
    }
}
