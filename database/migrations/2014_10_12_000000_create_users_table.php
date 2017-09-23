<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->default('')->comment('用户名');
            $table->string('avatar', 200)->nullable();
            $table->string('mobile', 12)->nullable()->default('');
            $table->string('email')->nullable()->default('');
            $table->string('password')->default('')->comment('密码');
            $table->string('openid', 50)->default('')->comment('OPENID');
            $table->string('nickname', 50)->default('')->comment('昵称');
            $table->string('remark', 100)->default('')->comment('备注');
            $table->integer('sex')->default(0)->comment('性别');
            $table->string('language', 20)->default('')->comment('语言');
            $table->string('city', 50)->default('')->comment('城市');
            $table->string('province', 50)->default('')->comment('省');
            $table->string('country', 50)->default('')->comment('国家');
            $table->string('headimgurl', 255)->default('')->comment('头像');
            $table->integer('unionid')->nullable()->comment('unionid');
            $table->integer('subscribe')->nullable()->comment('是否已关注');
            $table->timestamp('subscribe_time')->nullable()->comment('关注时间');
            $table->unsignedInteger('groupid')->default(0)->comment('粉丝组groupid');
            $table->string('tagid_list', 50)->default('')->comment('微信用户标签ID列表');
            $table->timestamp('last_online_at')->nullable()->comment('最后一次在线时间');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
