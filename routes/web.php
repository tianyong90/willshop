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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/admin/{vue_capture?}', 'WebController@admin')->where('vue_capture', '[\/\w\.-]*');

Route::get('/shop/{vue_capture?}', 'WebController@shop')->where('vue_capture', '[\/\w\.-]*'); //->middleware('wechat.oauth');
