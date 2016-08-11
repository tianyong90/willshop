<?php

namespace App\Http\Controllers\Api;

use App\Product;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
    public function lists()
    {
        return Product::all();
    }
}
