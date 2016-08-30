<?php

namespace App\Http\Controllers\Api;

use App\Address;
use App\Product;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

class AddressController extends Controller
{
    /**
     * 添加地址
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(Request $request)
    {
        $data = $request->all();
        $data['user_id'] = 1;

        Address::create($data);

        return response()->json(['info' => '添加成功']);
    }

    /**
     * 更新地址
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Request $request, $id)
    {
        $data = $request->all();
        $data['user_id'] = 1;

        Address::where('id', $id)->update($data);

        return response()->json(['info' => '添加成功']);
    }

    /**
     * 删除地址
     *
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        Address::where('id', $id)->delete();

        return response()->json(['info' => '删除成功']);
    }

    /**
     * 地址列表
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function lists()
    {
        return Address::with('product')->get();
    }
}
