<?php

namespace App\Http\Controllers\Api;

use App\Post;
use Illuminate\Http\Request;

class PostController extends BaseApiController
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
     * 文章列表
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function lists()
    {
        $posts = $this->post->all();

        return response()->json(compact('posts'));
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
        $post = $this->post->findOrFail($id);

        return response()->json(compact('post'));
    }
}
