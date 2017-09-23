<?php

namespace App\Http\Controllers\Api;

use App\Favourite;
use App\Product;
use Illuminate\Http\Request;

class FavouriteController extends BaseApiController
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
        parent::__construct();

        $this->favourite = $favourite;
        $this->product = $product;
    }

    /**
     * 列出收藏
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function list()
    {
        $favourites = $this->favourite->with('product')->where('user_id', $this->currentUser->id)->get();

        return response()->json(compact('favourites'));
    }

    /**
     * 加入购物车
     *
     * @param int $productId
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function add($productId)
    {
        $data['user_id'] = $this->currentUser->id;
        $data['product_id'] = $productId;

        $this->favourite->create($data);

        return response()->json(['info' => '添加成功']);
    }

    /**
     * 删除
     *
     * @param int $favouriteId
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($productId)
    {
        $data['user_id'] = $this->currentUser->id;
        $data['product_id'] = $productId;

        try {
            $this->favourite->where($data)->delete();

            return response()->json(['info' => '删除成功']);
        } catch (\Exception $e) {
            return response($e->getMessage(), 500);
        }
    }

    /**
     * 切换收藏状态
     *
     * @param int $productId
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function toggle($productId)
    {
        $data['user_id'] = $this->currentUser->id;
        $data['product_id'] = $productId;

        if ($this->favourite->where($data)->first()) {
            return $this->destroy($productId);
        } else {
            return $this->add($productId);
        }
    }

    /**
     * 判断商品是否已收藏
     *
     * @param int $productId
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function checkFavourite($productId)
    {
        $data['user_id'] = $this->currentUser->id;
        $data['product_id'] = $productId;

        if ($this->favourite->where($data)->first()) {
            return response()->json(['info' => '检测成功', 'isFavourite' => true]);
        } else {
            return response()->json(['info' => '检测成功', 'isFavourite' => false]);
        }
    }
}
