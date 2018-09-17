<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\GenreResource;
use App\Http\Resources\GenreSecondResource;
use App\Http\Controllers\BaseApiController;
use App\Service\Api\CategoryControllerLogic as Logic;

class CategoryController extends BaseApiController
{

    /**
    * select box で取得
    **/
    public function getSelectBox() {
        $categories = \Config::get('category.select');
        return new JsonResponse(['data' => $categories]);
    }

    /**
    * category取得
    **/
    public function getSelectBoxCategories($id = null) {
        $categories = Logic::getCategoryByBigCategoryId($id);
        return CategoryResource::collection($categories);
    }

    /**
    * genre取得
    */
    public function getSelectBoxGenres($id = null) {
        $genres = Logic::getGenresByCategoryId($id);
        return GenreResource::collection($genres);
    }

    /**
    * genre取得
    */
    public function getSelectBoxSecondGenres($id = null) {
        $second_genres = Logic::getSecondGenresByCategoryId($id);
        return GenreSecondResource::collection($second_genres);
    }

    // カテゴリ、ジャンルリストを取得する
    public function getCategoryList(Request $request) {
        $big_category_id = $request->input('big_category_id');
        $categories = Logic::getCategoryAndGenreList($big_category_id);
        $big_categories = \Config::get('category.select');
        $big_category_name = $big_categories[$big_category_id];

        return new JsonResponse(['list' => $categories, 'name' => $big_category_name]);
    }

    // ブランドモーダルのリストを取得する
    public function getModalBrandList(Request $request) {
        $params = $request->input();
        $brands = Logic::getModalBrandListByAnyId($params);
        return new JsonResponse($brands);
    }
}
