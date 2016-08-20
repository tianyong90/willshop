<?php

namespace App\Http\Controllers\Api;

use App\Product;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    /**
     * 商品列表
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function lists()
    {
        return Product::all();
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
        return Product::find($id);
    }
}
