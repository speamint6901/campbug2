<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Service\ItemRegisterControllerLogic as Logic;
use App\Http\Resources\BrandResource;

class BrandController extends Controller
{

    public function getSelectBox() {
        $brands = Logic::brandSelectBox();
        return BrandResource::collection($brands);
    }

}
