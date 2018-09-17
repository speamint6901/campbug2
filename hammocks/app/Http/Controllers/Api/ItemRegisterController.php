<?php

namespace App\Http\Controllers\Api;

use Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests\Api\ImageRegisterRequest;
use Illuminate\Support\Facades\Redirect;
use App\Http\Controllers\Controller;
use App\Service\ItemRegisterControllerLogic as Logic;

class ItemRegisterController extends Controller
{

    // アイテム登録処理
    public function showItemConfirm(ImageRegisterRequest $request) {
        $post = $request->input();

        // キャッシュから画像情報を取得
        $cache_key = "item_" . $this->users_id;
        $img_cache = \Cache::get($cache_key, null); 
        if ( ! is_null($img_cache) && ! empty($img_cache)) {
            $post["pict-data-url"] = $img_cache[0]["data_url"];
            $post["pict-mimetype"] = $img_cache[0]["mime_type"];
        }

        // アイテム登録
        Logic::register($this->users_id, $post);
        self::clearImageUploaderCache($cache_key);
        return redirect("item/register/complete");
    }
}
