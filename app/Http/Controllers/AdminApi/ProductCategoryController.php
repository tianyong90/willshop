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
        parent::__construct();

        $this->product = $product;
        $this->productCategory = $productCategory;
    }

    /**
     * 分类详情
     *
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $category = $this->productCategory->find($id);

        return response()->json(compact('category'));
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function list(Request $request)
    {
        $categories = $this->productCategory->withCount('products')->paginate();

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

    /**
     * 保存，新增或更新
     *
     * @param Request $request
     *
     * @return mixed
     */
    public function store(Request $request)
    {
        $data = $request->all();

        try {
            $this->productCategory->updateOrCreate(['id' => $data['id']], $data);

            return $this->message('保存成功');
        } catch (\Exception $e) {
            return $this->failed('保存失败');
        }
    }

    /**
     * 删除分类
     *
     * @param $id
     *
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Symfony\Component\HttpFoundation\Response
     */
    public function destroy($id)
    {
        $category = $this->productCategory->find($id);

        if (count($category->products) > 0) {
            return response('请先删除分类下的商品', 400);
        }

        $this->productCategory->destroy($id);

        return response('删除成功', 200);
    }
}
