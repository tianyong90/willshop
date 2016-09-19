<?php

namespace App\Api\Controllers;

use App\Address;
use Illuminate\Http\Request;
use Auth;

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
    public function index()
    {
        return $this->address->where('user_id', Auth::id())->get();
    }

    /**
     * 地址详情
     *
     * @param $id
     *
     * @return mixed
     */
    public function show($id)
    {
        return $this->address->findOrFail($id);
    }

    /**
     * 添加地址
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $data = $request->input('address');

        $data['user_id'] = Auth::id();

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

        $data['user_id'] = Auth::id();

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
    public function destroy($id)
    {
        $this->address->where('id', $id)->delete();

        return response()->json(['info' => '删除成功']);
    }
}
