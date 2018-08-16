<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class UserTest extends \TestCase
{

   use RefreshDatabase;
   use WithoutMiddleware;

    /**
     * ユーザー登録テストバリデーション
     *
     * @return void
     */
    public function testPostRegisterValid()
    {
        $this->withoutMiddleware(VerifyCsrfToken::class);

	// 登録データ
        $post_data = [
            "name" => "",
            "email" => "test6901",
            "password" => "roma6901dfafadfadfdafa",
        ];
        
        $response = $this->post('/auth/register', $post_data);

        $response->assertSessionHasErrors("name");
        $response->assertSessionHasErrors("email");
        $response->assertSessionHasErrors("password");
    }

    /**
     * ユーザー登録テスト
     *
     * @return void
     */
    public function testPostRegisterSuccess()
    {
        $this->withoutMiddleware(VerifyCsrfToken::class);

	// 登録データ
        $post_data = [
            "name" => "test",
            "email" => "test6901@yahoo.co.jp",
            "password" => "roma6901",
            //"password_confirmation" => "roma6901",
        ];
        
        $response = $this->post('/auth/register', $post_data);

        $response->assertStatus(302);


    }

    // ログインのテスト
    public function testLogin() {

        $this->withoutMiddleware(VerifyCsrfToken::class);

	// ログインデータ
        $post_data = [
            "email" => "test6901@yahoo.co.jp",
            "password" => "roma6901",
        ];

        $response = $this->withSession(["url_referer" => "test/index"])
			->post('/auth/login', $post_data);

        $response->assertStatus(302);
	$response->assertSessionHas("url_referer");
    }
}
