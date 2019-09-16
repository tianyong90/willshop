<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('/', 'welcome');

Route::view('/admin/{path?}', 'admin_entry')->where('path', '[\/\w\.-]*');

Route::view('/shop/{path?}', 'shop_entry')->where('path', '[\/\w\.-]*'); //->middleware('wechat.oauth');
