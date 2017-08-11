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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['prefix' => 'shop', 'namespace' => 'Api'], function () {
    // Login and Register
    Route::post('/login', 'AuthController@authenticate');
    Route::post('/register', 'AuthController@register');

    // 商品相关
    Route::get('/product', 'ProductController@lists');
    Route::get('/product/{id}', 'ProductController@show');

    Route::get('/product-categories', 'ProductCategoryController@lists');

    // 文章
    Route::get('/post', 'PostController@lists');
    Route::get('/post/{id}', 'PostController@detail');

    Route::group(['middleware' => []], function () {
        Route::post('/update-password', 'AuthController@updatePassword');
        Route::get('/current-user', 'AuthController@getAuthenticatedUser');
        Route::post('/user/avatar', 'UserController@avatar');

        Route::post('/checkout', 'OrderController@store');
        Route::get('/order', 'OrderController@index');
        Route::get('/order/{$id}', 'OrderController@show');

        Route::get('/cart', 'CartController@index');
        Route::post('/cart/add', 'CartController@store');
        Route::post('/cart/{cartId}/delete', 'CartController@destroy');
        Route::get('/cart/product-amount', 'CartController@getProductAmount');

        Route::get('/favourite/{productId}/add', 'FavouriteController@add');
        Route::get('/favourite/{productId}/delete', 'FavouriteController@delete');
        Route::get('/favourite/{productId}/toggle', 'FavouriteController@toggle');
        Route::get('/favourite/{productId}/is-favourite', 'FavouriteController@checkFavourite');
        Route::get('/favourite', 'FavouriteController@lists');

        // 地址
        Route::get('/address', 'AddressController@index');
        Route::post('/address/store', 'AddressController@store');
        Route::get('/address/{id}', 'AddressController@show')->where('id', '\d+');
        Route::delete('/address/{id}/delete', 'AddressController@destroy');
    });
});
