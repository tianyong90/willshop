<?php

namespace App\Http\Controllers\Api;

use App\Favourite;
use App\Product;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

class FavouriteController extends Controller
{
    /**
     * @var Favourite
     */
    private $favourite;

    /**
     * @var Product
     */
    private $product;

    /**
     * FavouriteController constructor.
     *
     * @param Favourite $favourite
     * @param Product   $product
     */
    public function __construct(Favourite $favourite, Product $product)
    {
        $this->favourite = $favourite;
        $this->product = $product;
    }

    /**
     * 加入购物车
     *
     * @param $productId
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function add($productId)
    {
//        return Product::all();

        return response()->json(['info' => '添加成功']);
    }
}
