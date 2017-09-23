<?php

namespace App\Http\Controllers\Api;

use App\Product;
use App\ProductCategory;
use Illuminate\Http\Request;

class ProductController extends BaseApiController
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
        parent::__construct();

        $this->product = $product;
        $this->productCategory = $productCategory;
    }

    /**
     * 商品详情
     *
     * @param int $id
     *
     * @return mixed
     */
    public function show($id)
    {
        $product = $this->product->findOrFail($id);

        return response()->json(compact('product'));
    }

    /**
     * 商品列表
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function list(Request $request)
    {
        $keyword = $request->input('keyword');
        $categoryId = $request->input('categoryId');
        $limit = $request->input('limit');

        $products = $this->product->where(function ($query) use ($keyword, $categoryId, $limit) {
            if ($keyword) {
                $query->where('name', 'LIKE', "%{$keyword}%");
            }

            if ($categoryId) {
                $query->where('category_id', $categoryId);
            }

            if ($limit) {
                $query->limit($limit);
            }
        })->paginate();

        return response()->json(compact('products'));
    }
}
