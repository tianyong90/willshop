<?php

namespace App\Http\Controllers\Api;

use App\Product;
use Illuminate\Http\Request;

use App\ProductCategory;

class ProductCategoryController extends BaseController
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


    public function lists()
    {
        return $this->productCategory->all();
    }
}
