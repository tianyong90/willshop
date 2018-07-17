<?php

namespace App\Http\Controllers\AdminApi;

use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;

class RoleController extends BaseApiController
{
    /**
     * @var Role
     */
    private $role;

    /**
     * RoleController constructor.
     *
     * @param Role $role
     */
    public function __construct(Role $role)
    {
        parent::__construct();

        $this->role = $role;
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function list()
    {
        $roles = $this->role->paginate();

        return response()->json(compact('roles'));
    }

    /**
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $role = $this->role->findOrFail($id);

        return response()->json(compact('role'));
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
        $this->role->where('id', $id)->delete();

        return response()->json(['info' => '删除成功']);
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getGuardnames(Request $request)
    {
        $guardNames = $this->role->select('guard_name')->get()->pluck('guard_name');

        return response()->json(compact('guardNames'));
    }
}
