<?php

namespace App\Api\Controllers;

use App\Address;
use Illuminate\Http\Request;

class AddressController extends BaseController
{
    /**
     * @var Address
     */
    private $address;

    /**
     * AddressController constructor.
     *
     * @param Address $address
     */
    public function __construct(Address $address)
    {
        $this->address = $address;
    }


    /**
     * 地址列表
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function lists()
    {
        return $this->address->all();
    }

    /**
     * 添加地址
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(Request $request)
    {
        $data = $request->input('address');
        $data['user_id'] = 1;

        $this->address->create($data);

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

        $this->address->where('id', $id)->update($data);

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
        $this->address->where('id', $id)->delete();

        return response()->json(['info' => '删除成功']);
    }
}
