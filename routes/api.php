<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', 'Api\AuthenticateController@authenticate');

Route::get('/product', 'Api\ProductController@lists');
Route::get('/product-category', 'Api\ProductCategoryController@lists');
