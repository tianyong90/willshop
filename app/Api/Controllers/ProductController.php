<?php

namespace Api\Controllers;

use App\Product;
use App\ProductCategory;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

class ProductController extends Controller
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
     * 商品列表
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function lists()
    {
        return $this->product->take(6)->get();
    }

    /**
     * 商品详情
     *
     * @param int $id
     *
     * @return mixed
     */
    public function detail($id)
    {
        return $this->product->find($id);
    }
}
