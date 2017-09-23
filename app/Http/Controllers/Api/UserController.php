<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Image;

class UserController extends BaseApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getCurrentUser()
    {
        return response()->json(['user' => $this->currentUser]);
    }

    /**
     * 设置头像
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function avatar(Request $request)
    {
        if (!$user = $this->currentUser) {
            return response('Unauthorized.', 401);
        }

        $data = $request->all();

        $file = $request->file('avatar');

        if ($file->isValid()) {
            $avatarUrl = "/uploads/avatar/avatar-{$user->id}.jpg";

            Image::make($file)->resize($data['width'], $data['height'])->crop($data['cropWidth'], $data['cropHeight'], $data['cropX'], $data['cropY'])->save(public_path($avatarUrl));

            $user->avatar = $avatarUrl;

            $user->save();

            return response()->json(['status' => 1, 'info' => '保存成功']);
        } else {
            return response()->json(['status' => 0, 'info' => '文件无效']);
        }
    }
}
