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
//Route::any('wechat-api', 'WechatController@serve');

Route::prefix('admin')
    ->namespace('AdminApi')
    ->group(function () {
        // Login
        Route::post('/login', 'AuthenticateController@login');
        Route::post('/logout', 'AuthenticateController@logout');
        Route::get('/login-qrcode', 'AuthenticateController@getLoginQrcode');

        Route::middleware(['auth:api'])
            ->group(function () {
                Route::get('/current-user', 'AuthenticateController@getAuthenticatedUser');
                Route::get('/users', 'UserController@list');

                // roles
                Route::resource('roles', 'RoleController');

                Route::get('guard-names', 'RoleController@getGuardnames');

                // permissions
                Route::resource('permissions', 'PermissionController');

                // orders
                Route::resource('orders', 'OrderController');

                // product
                Route::resource('products', 'ProductController');

                // coupon
                Route::resource('coupons', 'CouponController');

                // brand
                Route::resource('brands', 'BrandController');

                // product-category
                Route::resource('categories', 'ProductCategoryController');

            });
    });

Route::prefix('shop')
    ->namespace('Api')
    ->group(function () {
        // Login and Register
//     Route::post('/login', 'AuthController@authenticate');
//     Route::post('/register', 'AuthController@register');

        // 商品相关
        Route::resource('products', 'ProductController')->only(['index', 'show']);
        Route::resource('products', 'ProductController')->only(['index', 'show']);

        // 商品分类
        Route::resource('product-categories', 'ProductCategoryController')->only(['show']);

        // 文章
        Route::resource('/posts', 'PostController')->only(['index', 'show']);

        Route::group(['middleware' => []], function () {
            // 当前用户
            Route::get('current-user', 'UserController@getCurrentUser');

            // 下单及结算
            Route::post('checkout', 'OrderController@store');

            Route::resource('/orders', 'OrderController');
//        Route::get('/orders/{orderNumber}', 'OrderController@show');
//        Route::post('/orders/{orderId}/cancel', 'OrderController@cancel');
//        Route::post('/orders/{orderId}/destroy', 'OrderController@destroy');

            // 购物车
            Route::resource('cart', 'CartController');
            Route::get('/carts/product-amount', 'CartController@getProductAmount');
            Route::post('/carts/update-amount', 'CartController@updateAmount');

            // 收藏
            Route::resource('favourites', 'FavouriteController');
//        Route::get('/favourite/{productId}/toggle', 'FavouriteController@toggle');
//        Route::get('/favourite/{productId}/is-favourite', 'FavouriteController@checkFavourite');

            // 地址
            Route::resource('address', 'AddressController');
        });
    });
