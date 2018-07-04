<?php

namespace App\Http\Controllers\AdminApi;

use Spatie\Permission\Models\Permission;
use App\ProductCategory;
use Illuminate\Http\Request;

class CategoryController extends BaseApiController
{
    /**
     * @var ProductCategory
     */
    private $productCategory;

    /**
     * ProductCategoryController constructor.
     *
     * @param ProductCategory $productCategory
     */
    public function __construct(ProductCategory $productCategory)
    {
        parent::__construct();

        $this->productCategory = $productCategory;
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function list()
    {
        $categories = $this->productCategory->paginate();

        return response()->json(compact('categories'));
    }

    /**
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $category = $this->productCategory->findOrFail($id);

        return response()->json(compact('category'));
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
        $this->productCategory->where('id', $id)->delete();

        return response()->json(['info' => '删除成功']);
    }
}
