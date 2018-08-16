<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\User;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    protected $redirectAfterLogout = 'auth/login';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        parent::__construct($request);
        $this->middleware('guest')->except(['logout', 'getLogout']);
        // リダイレクト先を動的に変更
        $url_referer = session()->get("url_referer");
        if ( ! is_null($url_referer)) {
            $this->redirectTo = $url_referer;
        }
    }

    /**
     * Show the application's login form.
     *
     * @return \Illuminate\Http\Response
     */
    public function showLoginForm()
    {
        return \View::make('auth.login', $this->data);
    }

    /**
    * postLoginカスタム
    * 既存の機能にメール認証チェックをかける
    *
    * @params $request  \Request
    * @return mixed
    */
    public function login(Request $request) {
        $this->validateLogin($request);

        $user = User::where('email', '=', $request->post('email'))->first();
        if ($user) {
            if(! $user->isConfirmed()) {
                \Session::flash('flash_message', 'ユーザー登録確認メールに従って、ユーザーを有効化してください。');
                return redirect()->back()->withInput($request->only('email'));
            }
        }

        // If the class is using the ThrottlesLogins trait, we can automatically throttle
        // the login attempts for this application. We'll key this by the username and
        // the IP address of the client making these requests into this application.
        if ($this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        if ($this->attemptLogin($request)) {
            return $this->sendLoginResponse($request);
        }

        $this->incrementLoginAttempts($request);

        return $this->sendFailedLoginResponse($request);
    }
}
