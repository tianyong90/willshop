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

//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:api');

$api = app(\Dingo\Api\Routing\Router::class);

$api->version('v1', function ($api) {

    $api->group(['namespace' => 'App\Api\Controllers'], function ($api) {
        // Login and Register
        $api->post('login', 'AuthController@authenticate');
        $api->post('regiter', 'AuthController@register');

        $api->get('/update-password', 'AuthController@updatePassword');
        $api->get('/current-user', 'AuthController@getAuthenticatedUser');

        $api->get('/product-category', 'ProductCategoryController@lists');

        $api->get('/checkout', 'OrderController@checkout');

        $api->get('/product', 'ProductController@lists');
        $api->get('/product/{id}', 'ProductController@detail');

        $api->get('/cart/add', 'CartController@add');
        $api->get('/cart/{cartId}/delete', 'CartController@delete');
        $api->get('/cart/lists', 'CartController@lists');
        $api->get('/cart/product-amount', 'CartController@getProductAmount');

        $api->get('/favourite/{productId}/add', 'FavouriteController@add');
        $api->get('/favourite/{productId}/delete', 'FavouriteController@delete');
        $api->get('/favourite/{productId}/toggle', 'FavouriteController@toggle');
        $api->get('/favourite/{productId}/is-favourite', 'FavouriteController@checkFavourite');
        $api->get('/favourite', 'FavouriteController@lists');

        // 地址
        $api->get('/address', 'AddressController@lists');
        $api->post('/address/add', 'AddressController@add');
        $api->get('/address/{id}', 'AddressController@detail');
        $api->get('/address/{id}/edit', 'AddressController@edit');
        $api->get('/address/{id}/delete', 'AddressController@delete');

        // 文章
        $api->get('/post', 'PostController@lists');
        $api->get('/post/{id}', 'PostController@detail');
    });
});
