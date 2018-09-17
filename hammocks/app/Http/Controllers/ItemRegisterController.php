<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests\ImageRegisterRequest;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ItemRegisterPostRequest;
use App\Http\Controllers\ItemController;
use App\Service\ItemRegisterControllerLogic as Logic;

class ItemRegisterController extends ItemController
{

    //　認証チェック
    public function __construct(Request $request) {
        parent::__construct($request);
    }

    // step1のバリデーションルール
    protected function stepOneValidator(array $data)
    {
        return Validator::make($data, [
            'brand_id' => 'required|integer',
            'item_name' => 'required|max:64',
        ]);
    }

    // ステップアップ登録ページ　１ページ目
    public function showStepOne(Request $request) {

         // 画像キャッシュクリア
        $this->clearImageUploaderCache("item");

        $this->data['big_category'] = \Config::get('category.select');

        $this->data['params'] = [];
        return \View::make('item.register2', $this->data);
    }

    // アイテム登録処理
    public function showItemConfirm(ImageRegisterRequest $request) {
        $post = $request->input();
        if (empty($post)) {
             return Redirect::to('/item/register')->send();
        }

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

    // 登録完了
    public function showComplete(Request $request) {
        return \View::make('item.register-complete', $this->data);
    }

    // 出品 step1
    public function showSaleStepOne(Request $request, $id) {
        $items = Logic::getItemById($id);

        // アイテムが見つからないと例外
        if (is_null($items)) {
            throw new \App\Exceptions\NotFoundUserException("アイテムが見つかりません");
        }

        // 出品重複チェック
        Logic::checkSaleItemDeplicate($this->users_id, $id);

        // アクセス時にアップロード済みの画像をキャッシュから削除
        $this->clearImageUploaderCache("sale_item");

        // アップロードタイプ設定
        $this->data['upload_type'] = "sale_item";

        $this->data['items'] = $items;

        // セッションからpostデータを取得
        $post_data = $request->session()->get("post_step1", null);
        if ( ! is_null($post_data)) {
            $this->data['post_data'] = $post_data;
        }

        // 商品の状態リストをマスタから取得
        $this->data['item_conditions'] = Logic::getMstItemConditions()->toArray();
        //var_dump($this->data['item_conditions']);exit;

        return \View::make('item.sale.register1', $this->data);
    }

    // 出品 step2 (get)
    public function showGetSaleStepTwo(Request $request) {
        $post_data = $request->session()->get('post_step2', null);
        // いきなりstep2へアクセスしたらエラーページへ
        if (is_null($post_data)) {
            throw new \App\Exceptions\SaleItemRegisterException("不正なアクセスです");
        } 
        $this->data['post_data'] = $post_data;
        $this->setPulldownStep2();

        return \View::make('item.sale.register2', $this->data);
    }

    // 出品 step2
    public function showSaleStepTwo(Request $request) {
        $post_data = $request->session()->get('post_step2', null);
        if ( ! is_null($post_data)) {
            $this->data['post_data'] = $post_data;
        }
        $post = $request->input();
        // セッションにpost_dataを保存
        $request->session()->put('post_step1', $post);

        $this->setPulldownStep2();

        return \View::make('item.sale.register2', $this->data);
    }

    // ステップ２puldownセット
    private function setPulldownStep2() {
        // 宅配業者一覧（プルダウン用）
        $this->data['delivery_company'] = Logic::getMstDeliveryCompany()->toArray();

        // 都道府県一覧(プルダウン用）
        $this->data['prefectures'] = Logic::getPrefectures()->toArray();

        // 発送日一覧（プルダウン用）
        $this->data['delivery_day_nums'] = Logic::getDeliveryDayNums();
    }

    // 出品 step3(get)
    public function showGetSaleStepThree(Request $request) {
        $post_data = $request->session()->get('post_step3', null);
        if (is_null($post_data)) {
            throw new \App\Exceptions\SaleItemRegisterException("不正なアクセスです");
        }
        $this->data['post_data'] = $post_data;
        return \View::make('item.sale.register3', $this->data);
    }

    // 出品 step3(post)
    public function showSaleStepThree(Request $request) {
        $post = $request->input();
        // セッションにpost_dataを保存
        $request->session()->put('post_step2', $post);

        return \View::make('item.sale.register3', $this->data);
    }

    // 出品 step4(get)
    public function showGetSaleStepFour(Request $request) {
        if (is_null($request->session()->get('post_step3', null))) {
            throw new \App\Exceptions\SaleItemRegisterException("不正なアクセスです"); 
        }
        $this->stepFourDetailFunc($request);
        return \View::make('item.sale.register4');
    }

    // 出品 step4(post)
    public function showSaleStepFour(Request $request) {
        $post = $request->input();
        // セッションにpost_dataを保存
        $request->session()->put('post_step3', $post);

        $this->stepFourDetailFunc($request);
        
        return \View::make('item.sale.register4', $this->data);
    }

    // step4 getとpostの共通処理
    private function stepFourDetailFunc($request) {
        // セッションに格納したフォームデータをマージする
        $post_step1 = $request->session()->get('post_step1', null);
        $post_step2 = $request->session()->get('post_step2', null);
        $post_step3 = $request->session()->get('post_step3', null);

        if ( ! is_null($post_step1) && ! is_null($post_step2) && ! is_null($post_step3)) {
            $post_data = $post_step1 + $post_step2 + $post_step3;
            $request->session()->put("merge_post_data", $post_data);
        } else {
            // TODO ここは例外で飛ばすべき
            return redirect("item/sale/register3");
        }

        // キャッシュから画像を取り出す
        $image_cache_key = $post_data['upload-type'] . "_" . $post_data['items_id'] . "_" . $this->users_id;
        $images = \Cache::get($image_cache_key, null);

        // postデータのプルダウン値を文字列に変換する
        $post_data = Logic::pulldownValue2String($post_data);

        $this->data['result_data'] = ["post_data" => $post_data, "images" => $images];
    }

    // 出品完了処理
    public function saleItemConfirm(Request $request) {
        
        // マージ済みのpostデータを取り出す
        $post = $request->session()->get("merge_post_data", null);

        // 空は例外
        if ( is_null($post) || empty($post)) {
            throw new \App\Exceptions\SaleItemRegisterException("入力した情報が見つかりません");
        }

        // 画像情報をキャッシュから取り出す
        $image_cache_key = $post['upload-type'] . "_" . $post['items_id'] . "_" . $this->users_id;
        $images = \Cache::get($image_cache_key);

        // 空は例外
        if ( is_null($images) || empty($images)) {
            throw new \App\Exceptions\SaleItemRegisterException("画像が見つかりません");
        }
        
        $user_items = Logic::saleItemRegister($post, $images, $this->users_id);

        if ( ! is_null($user_items) && ! empty($user_items)) {
            // キャッシュに保存している画像データを削除
            self::clearImageUploaderCache($image_cache_key);
            $request->session()->forget('post_step1');
            $request->session()->forget('post_step2');
            $request->session()->forget('post_step3');
            $request->session()->forget("merge_post_data");
            return redirect("user/item/sale/".$user_items->id);
        }
        throw new \App\Exceptions\SaleItemRegisterException("出品中にエラーが発生しました");
    }
}
