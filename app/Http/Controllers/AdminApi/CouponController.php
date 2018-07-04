<?php

namespace App\Http\Controllers\AdminApi;

use Spatie\Permission\Models\Permission;
use Illuminate\Http\Request;

class CouponController extends BaseApiController
{
    /**
     * @var Permission
     */
    private $permission;

    /**
     * PermissionController constructor.
     *
     * @param Permission $role
     */
    public function __construct(Permission $role)
    {
        parent::__construct();

        $this->permission = $role;
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function list()
    {
        $permissions = $this->permission->paginate();

        return response()->json(compact('permissions'));
    }

    /**
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $permission = $this->permission->findOrFail($id);

        return response()->json(compact('permission'));
    }

    /**
     * @param Request $request
     */
    public function store(Request $request)
    {

    }

    /**
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function delete($id)
    {
        $this->permission->where('id', $id)->delete();

        return response()->json(['info' => '删除成功']);
    }
}
