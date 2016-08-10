<?php

namespace App\Http\Controllers\Mobile;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class IndexController extends MobileController
{
    public function index()
    {
        echo 'hellp world';
    }
}
