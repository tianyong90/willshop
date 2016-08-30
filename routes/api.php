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
})->middleware('auth:api');

Route::group(['namespace' => 'Api'], function () {
    Route::get('/login', 'AuthenticateController@authenticate');
    Route::get('/update-password', 'AuthenticateController@updatePassword');

    Route::get('/product-category', 'ProductCategoryController@lists');

    Route::any('/checkout', 'OrderController@checkout');

    Route::get('/product', 'ProductController@lists');
    Route::get('/product/{id}', 'ProductController@detail');

    Route::get('/cart/{productId}/add', 'CartController@add');
    Route::get('/cart/{cartId}/delete', 'CartController@delete');
    Route::get('/cart/lists', 'CartController@lists');

    Route::get('/favourite/{productId}/add', 'FavouriteController@add');
    Route::get('/favourite/{favouriteId}/delete', 'FavouriteController@delete');
    Route::get('/favourite/lists', 'FavouriteController@lists');

    // 地址
    Route::get('/address', 'AddressController@lists');
    Route::post('/address/add', 'AddressController@add');
    Route::get('/address/{id}/get', 'AddressController@detail');
    Route::post('/address/{id}/edit', 'AddressController@edit');
    Route::get('/address/{id}/delete', 'AddressController@delete');
});
