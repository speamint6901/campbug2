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

/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/

Route::get('brands', 'Api\BrandController@getSelectBox');
Route::get('categories', 'Api\CategoryController@getSelectBox');
Route::get('middle-categories/{id}', 'Api\CategoryController@getSelectBoxCategories')
            ->where(['id' => '[0-9]+']);
Route::get('genres/{id}', 'Api\CategoryController@getSelectBoxGenres')
            ->where(['id' => '[0-9]+']);
Route::get('second-genres/{id}', 'Api\CategoryController@getSelectBoxSecondGenres')
            ->where(['id' => '[0-9]+']);
Route::post('uploader', 'Api\UploadController@tmpUpload');
Route::post('item/register/doRegister', 'Api\ItemRegisterController@showItemConfirm');
