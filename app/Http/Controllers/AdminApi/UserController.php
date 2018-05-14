<?php

namespace App\Http\Controllers\AdminApi;

use App\User;
use Illuminate\Http\Request;

class UserController extends BaseApiController
{
    /**
     * @var User
     */
    private $user;

    /**
     * UserController constructor.
     *
     * @param User $product
     */
    public function __construct(User $product)
    {
        parent::__construct();

        $this->user = $product;
    }

    /**
     * 商品列表
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function list()
    {
        $users = $this->user->paginate();

        return response()->json(compact('users'));
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
        $product = $this->user->findOrFail($id);

        return response()->json(compact('product'));
    }

    /**
     * 保存
     *
     * @param Request $request
     */
    public function store(Request $request)
    {
        // TODO
    }

    /**
     * @param $id
     */
    public function destroy($id)
    {
        // TODO:
    }
}
