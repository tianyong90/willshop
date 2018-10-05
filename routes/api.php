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

//// 微信消息服务
////Route::any('wechat-api', 'WechatController@serve');
//
//Route::group(['prefix' => 'admin', 'namespace' => 'AdminApi'], function () {
//    // Login
//    Route::post('/login', 'AuthenticateController@login');
//    Route::post('/logout', 'AuthenticateController@logout');
//    Route::get('/login-qrcode', 'AuthenticateController@getLoginQrcode');
//
//    Route::group(['middleware' => ['auth:api']], function () {
//        Route::get('/current-user', 'AuthenticateController@getAuthenticatedUser');
//        Route::get('/users', 'UserController@list');
//
//        // roles
//        Route::get('/roles', 'RoleController@list');
//        Route::get('/roles/{id}', 'RoleController@show');
//        Route::post('/role', 'RoleController@store');
//        Route::delete('/role/{id}', 'RoleController@delete');
//
//        Route::get('/guard-names', 'RoleController@getGuardnames');
//
//        // permissions
//        Route::get('/permissions', 'PermissionController@list');
//        Route::get('/permission/{id}', 'PermissionController@show');
//        Route::post('/permission/{id}', 'PermissionController@store');
//        Route::delete('/permission/{id}', 'PermissionController@destroy');
//
//        // orders
//        Route::get('/orders/list', 'OrderController@list');
//
//        // product
//        Route::get('/products', 'ProductController@list');
//        Route::get('/products/{id}', 'ProductController@show');
//        Route::post('/products/{id}', 'ProductController@store');
//
//        // coupon
//        Route::get('/coupons', 'CouponController@list');
//        Route::get('/coupons/{id}', 'CouponController@show');
//        Route::post('/coupons/{id}', 'CouponController@store');
//        Route::delete('/coupons/{id}', 'CouponController@delete');
//
//        // brand
//        Route::get('/brands', 'BrandController@list');
//        Route::get('/brands/{id}', 'BrandController@show');
//        Route::post('/brands/{id}', 'BrandController@store');
//        Route::delete('/brands/{id}', 'BrandController@delete');
//
//        // product-category
//        Route::get('/categories', 'ProductCategoryController@list');
//        Route::get('/categories/{id}', 'ProductCategoryController@show');
//        Route::post('/categories/store', 'ProductCategoryController@store');
//        Route::delete('/categories/{id}', 'ProductCategoryController@delete');
//
//    });
//});

Route::prefix('shop')
    ->namespace('Api')
    ->group(function () {
     // Login and Register
//     Route::post('/login', 'AuthController@authenticate');
//     Route::post('/register', 'AuthController@register');

    // 商品相关
//    Route::resource('products', 'ProductController')->only(['index', 'show']);
    Route::resource('products', 'ProductController')->only(['index', 'show']);
//
//    // 商品分类
//    Route::resource('product-categories', 'ProductCategoryController')->only(['show']);
//
//    // 文章
//    Route::resource('/posts', 'PostController')->only(['index', 'show']);

//    Route::group(['middleware' => []], function () {
//        // 当前用户
//        Route::get('/current-user', 'UserController@getCurrentUser');
//
//        // 下单及结算
//        Route::post('/checkout', 'OrderController@store');
//        Route::get('/orders', 'OrderController@list');
//        Route::get('/orders/{orderNumber}', 'OrderController@show');
//        Route::post('/orders/{orderId}/cancel', 'OrderController@cancel');
//        Route::post('/orders/{orderId}/destroy', 'OrderController@destroy');
//
//        // 购物车
//        Route::get('/cart', 'CartController@index');
//        Route::post('/cart/add', 'CartController@store');
//        Route::post('/cart/{cartId}/destroy', 'CartController@destroy');
//        Route::get('/cart/product-amount', 'CartController@getProductAmount');
//        Route::post('/cart/update-amount', 'CartController@updateAmount');
//
//        // 收藏
//        Route::get('/favourite', 'FavouriteController@list');
//        Route::get('/favourite/{productId}/add', 'FavouriteController@add');
//        Route::get('/favourite/{productId}/destroy', 'FavouriteController@destroy');
//        Route::get('/favourite/{productId}/toggle', 'FavouriteController@toggle');
//        Route::get('/favourite/{productId}/is-favourite', 'FavouriteController@checkFavourite');
//
//        // 地址
//        Route::get('/address', 'AddressController@list');
//        Route::post('/address/store', 'AddressController@store');
//        Route::get('/address/{id}', 'AddressController@show')->where('id', '\d+');
//        Route::delete('/address/{id}/destroy', 'AddressController@destroy');
//    });
});
