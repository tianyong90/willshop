<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WebController extends Controller
{
    /**
     * shop 入口页
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function shop()
    {
        return view('shop.index');
    }

    /**
     * admin 入口页
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function admin()
    {
        return view('admin.index');
    }


}
