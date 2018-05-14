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

// 微信消息服务
Route::any('wechat-api', 'WechatController@serve');

Route::group(['prefix' => 'admin', 'namespace' => 'AdminApi'], function () {
    // Login
    Route::post('/login', 'AuthenticateController@login');
    Route::post('/logout', 'AuthenticateController@logout');
    Route::get('/login-qrcode', 'AutHController@getLoginQrcode');

    Route::group(['middleware' => ['auth:api']], function () {
        Route::get('/user', 'AuthenticateController@getAuthenticatedUser');

        Route::get('/order/list', 'OrderController@list');

        // product
        Route::get('/product/list', 'ProductController@list');
        Route::get('/product/{id}/show', 'ProductController@show');
        Route::get('/product/{id}/store', 'ProductController@store');

        // product-category
        Route::get('/product-category/list', 'ProductCategoryController@list');
        Route::get('/product-category/{id}/show', 'ProductCategoryController@show');
        Route::post('/product-category/{id}/destroy', 'ProductCategoryController@destroy');
        Route::post('/product-category/store', 'ProductCategoryController@store');

        Route::get('/user/list', 'UserController@list');

    });
});

Route::group(['prefix' => 'shop', 'namespace' => 'Api'], function () {
    // // Login and Register
    // Route::post('/login', 'AuthController@authenticate');
    // Route::post('/register', 'AuthController@register');

    // 商品相关
    Route::get('/product', 'ProductController@list');
    Route::get('/product/{id}', 'ProductController@show');

    // 商品分类
    Route::get('/product-categories', 'ProductCategoryController@lists');

    // 文章
    Route::get('/post', 'PostController@lists');
    Route::get('/post/{id}', 'PostController@detail');

    Route::group(['middleware' => []], function () {
        // 当前用户
        Route::get('/current-user', 'UserController@getCurrentUser');

        // 下单及结算
        Route::post('/checkout', 'OrderController@store');
        Route::get('/order', 'OrderController@list');
        Route::get('/order/{orderNumber}', 'OrderController@show');
        Route::post('/order/{orderId}/cancel', 'OrderController@cancel');
        Route::post('/order/{orderId}/destroy', 'OrderController@destroy');

        // 购物车
        Route::get('/cart', 'CartController@index');
        Route::post('/cart/add', 'CartController@store');
        Route::post('/cart/{cartId}/destroy', 'CartController@destroy');
        Route::get('/cart/product-amount', 'CartController@getProductAmount');
        Route::post('/cart/update-amount', 'CartController@updateAmount');

        // 收藏
        Route::get('/favourite', 'FavouriteController@list');
        Route::get('/favourite/{productId}/add', 'FavouriteController@add');
        Route::get('/favourite/{productId}/destroy', 'FavouriteController@destroy');
        Route::get('/favourite/{productId}/toggle', 'FavouriteController@toggle');
        Route::get('/favourite/{productId}/is-favourite', 'FavouriteController@checkFavourite');

        // 地址
        Route::get('/address', 'AddressController@list');
        Route::post('/address/store', 'AddressController@store');
        Route::get('/address/{id}', 'AddressController@show')->where('id', '\d+');
        Route::delete('/address/{id}/destroy', 'AddressController@destroy');
    });
});
