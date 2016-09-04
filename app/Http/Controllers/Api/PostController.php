<?php

namespace App\Http\Controllers\Api;

use App\Post;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

class PostController extends Controller
{
    /**
     * @var Post
     */
    private $post;

    /**
     * PostController constructor.
     *
     * @param Post $post
     */
    public function __construct(Post $post)
    {
        $this->post = $post;
    }

    /**
     * 加入购物车
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(Request $request)
    {
        return response()->json(['info' => '添加成功']);
    }

    /**
     * 文章列表
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function lists()
    {
        return $this->post->all();
    }

    /**
     * 文章详细数据
     *
     * @param int $id
     *
     * @return Post
     */
    public function detail($id)
    {
        $post = $this->post->find($id);

        return $post;
    }

    /**
     * @param $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function delte($id)
    {
        $this->post->where('id', $id)->delete();

        return response()->json(['info' => '删除成功']);
    }
}
