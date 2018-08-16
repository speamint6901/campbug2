<?php

namespace App\Http\Controllers\Auth;

use Mail;
use Carbon\Carbon;
use App\User;
use Illuminate\Http\Request;
use App\Http\Requests\StoreUserPost;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        parent::__construct($request);
        $this->middleware('guest');
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data, $app_key, $sns_user = null)
    {
        // ユーザー登録
        // トランザクションの開始
        \DB::beginTransaction();
        try {

            $user = new User;
            $user->name = $data['name'];
            $user->email = $data['email'];
            $user->password = bcrypt($data['password']);
            $user->makeConfirmationToken($app_key);
            $user->confirmation_sent_at = Carbon::now();
            $user->save();
            // sns連携あれば
            if ( ! is_null($sns_user)) {
                if (isset($sns_user->avatar_original)) {
                    $user->avater_img_url = $sns_user->avatar_original;
                    $user->save();
                }
                $this->saveSnsUsers($sns_user, $user->id);
            }

            $this->otherUserInfoSave($user);

            \DB::commit();
            return $user;

        } catch (Exception $e) {
            \DB::rollBack();           
            throw $e;
        }
    }

    /**
     * Show the application registration form.
     *
     * @return \Illuminate\Http\Response
     */
    public function showRegistrationForm()
    {
        if (property_exists($this, 'registerView')) {
            return view($this->registerView);
        }

        $sns_user = session("sns_user", null);
        if ( ! is_null($sns_user)) {
            $this->data["user_name"] = $sns_user->name;
        }

        return view('auth.register', $this->data);
    }

    // 登録処理
    public function postRegister(StoreUserPost $request) {

        // sns連携時
        $sns_user = $request->session()->get("sns_user", null);
        // トランザクションの開始
        \DB::beginTransaction();

        try {
            $this->create($request->all(), \Config::get('app.key'), $sns_user);
            \Session::flash('flash_message', 'ユーザー登録確認メールを送りました。');
            \DB::commit();
        } catch (Exception $e) {
            // ロック解除
            \DB::rollBack();
            throw $e;
        }

        return redirect('auth/login');
     }

    // 他の必要テーブルでレコード作成
    // ユーザーIDのみ
    protected function otherUserInfoSave($user) {
         // プロフィール登録
        $profile = new \App\Models\User\Profile;
        $profile->users_id = $user->id;
        $profile->save();

        // user_info_count登録
        $user_info_count = new \App\Models\User\InfoCount;
        $user_info_count->users_id = $user->id;
        $user_info_count->save();

        // user_secret_profile登録
        $user_secret_profile = new \App\Models\User\SecretProfile;
        $user_secret_profile->users_id = $user->id;
        $user_secret_profile->is_sms_auth = 0;
        $user_secret_profile->is_certificate_auth = 0;
        $user_secret_profile->save();
        
        // todo mail送信
        $this->sendConfirmMail($user);
    }

    private function sendConfirmMail(User $user) {
        Mail::send(
            'emails.registration_confirmation',
            ['user' => $user, 'token' => $user->confirmation_token],
            function($message) use ($user) {
                $message->to($user->email, $user->name)->subject('ユーザー登録確認');
            }
        );
    }

    public function getConfirm($token) {
        $user = User::where('confirmation_token', '=', $token)->first();
        if ( ! $user) {
            \Session::flash('flash_message', '無効なトークンです。');
            return redirect('auth/login');
        }

        $user->confirm();
        $user->save();

        \Session::flash('flash_message', 'ユーザー登録が完了しました。ログインしてください。');
        return redirect('auth/login');
    }
}
