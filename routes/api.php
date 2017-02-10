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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// $api = app(\Dingo\Api\Routing\Router::class);

// $api->version('v1', function ($api) {

//     $api->group(['namespace' => 'App\Api\Controllers'], function ($api) {
//         // Login and Register
//         $api->post('/login', 'AuthController@authenticate');
//         $api->post('/register', 'AuthController@register');

//         // 商品相关
//         $api->get('/product', 'ProductController@lists');
//         $api->get('/product/{id}', 'ProductController@show');

//         $api->get('/product-category', 'ProductCategoryController@lists');

//         // 文章
//         $api->get('/post', 'PostController@lists');
//         $api->get('/post/{id}', 'PostController@detail');

// //        $api->group(['middleware' => ['jwt.auth', 'jwt.refresh']], function ($api) {
//         $api->group(['middleware' => ['jwt.auth']], function ($api) {
//             $api->post('/update-password', 'AuthController@updatePassword');
//             $api->get('/current-user', 'AuthController@getAuthenticatedUser');
//             $api->post('/user/avatar', 'UserController@avatar');

//             $api->post('/checkout', 'OrderController@store');
//             $api->get('/order', 'OrderController@index');
//             $api->get('/order/{$id}', 'OrderController@show');

//             $api->get('/cart', 'CartController@index');
//             $api->post('/cart/add', 'CartController@store');
//             $api->post('/cart/{cartId}/delete', 'CartController@destroy');
//             $api->get('/cart/product-amount', 'CartController@getProductAmount');

//             $api->get('/favourite/{productId}/add', 'FavouriteController@add');
//             $api->get('/favourite/{productId}/delete', 'FavouriteController@delete');
//             $api->get('/favourite/{productId}/toggle', 'FavouriteController@toggle');
//             $api->get('/favourite/{productId}/is-favourite', 'FavouriteController@checkFavourite');
//             $api->get('/favourite', 'FavouriteController@lists');

//             // 地址
//             $api->get('/address', 'AddressController@index');
//             $api->post('/address/store', 'AddressController@store');
//             $api->get('/address/{id}', 'AddressController@show')->where('id', '\d+');
//             $api->delete('/address/{id}/delete', 'AddressController@destroy');
//         });
//     });
// });
