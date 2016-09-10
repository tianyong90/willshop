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
    Route::any('/login', 'AuthenticateController@authenticate');
    Route::any('/register', 'AuthenticateController@register');
    Route::any('/update-password', 'AuthenticateController@updatePassword');

    Route::any('/product-category', 'ProductCategoryController@lists');

    Route::any('/checkout', 'OrderController@checkout');

    Route::any('/product', 'ProductController@lists');
    Route::any('/product/{id}', 'ProductController@detail');

    Route::any('/cart/add', 'CartController@add');
    Route::any('/cart/{cartId}/delete', 'CartController@delete');
    Route::any('/cart/lists', 'CartController@lists');
    Route::any('/cart/product-amount', 'CartController@getProductAmount');

    Route::any('/favourite/{productId}/add', 'FavouriteController@add');
    Route::any('/favourite/{productId}/delete', 'FavouriteController@delete');
    Route::any('/favourite/{productId}/toggle', 'FavouriteController@toggle');
    Route::any('/favourite/{productId}/is-favourite', 'FavouriteController@checkFavourite');
    Route::any('/favourite', 'FavouriteController@lists');

    // 地址
    Route::get('/address', 'AddressController@lists');
    Route::post('/address/add', 'AddressController@add');
    Route::get('/address/{id}', 'AddressController@detail');
    Route::any('/address/{id}/edit', 'AddressController@edit');
    Route::any('/address/{id}/delete', 'AddressController@delete');

    // 文章
    Route::any('/post', 'PostController@lists');
    Route::any('/post/{id}', 'PostController@detail');

});
