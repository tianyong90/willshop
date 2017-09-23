<?php

namespace App\Http\Controllers\AdminApi;

use App\Product;
use Illuminate\Http\Request;

use App\ProductCategory;

class ProductCategoryController extends BaseApiController
{
    /**
     * @var Product
     */
    private $product;

    /**
     * @var ProductCategory
     */
    private $productCategory;

    /**
     * ProductCategoryController constructor.
     *
     * @param Product         $product
     * @param ProductCategory $productCategory
     */
    public function __construct(Product $product, ProductCategory $productCategory)
    {
        $this->product = $product;
        $this->productCategory = $productCategory;
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function lists(Request $request)
    {
        $categories = $this->productCategory->all();

        return response()->json(compact('categories'));
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopCategories(Request $request)
    {
        $topCategories = $this->productCategory->where('parent_id', 0)->orderBy('id')->all();

        return response()->json(compact('topCategories'));
    }
}
