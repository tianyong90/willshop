<?php

namespace App\Api\Controllers;

use App\User;
use Illuminate\Http\Request;
use Auth;
use Image;

class UserController extends BaseController
{
    public function __construct()
    {
    }


    /**
     * 设置头像
     *
     * @param Request $request
     */
    public function avatar(Request $request)
    {
        if (!$user = Auth::user()) {
            return $this->response->error('Unauthorized.', 401);
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
