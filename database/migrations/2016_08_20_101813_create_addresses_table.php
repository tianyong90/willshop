<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAddressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id')->comment('用户ID');
            $table->string('name', 20)->nullable()->comment('收货人');
            $table->string('mobile', 13)->nullable()->comment('手机号');
            $table->string('postcode', 6)->nullable()->comment('邮编');
            $table->string('address_code', 6)->nullable()->comment('地址编码');
            $table->string('province', 20)->nullable()->comment('省');
            $table->string('city', 20)->nullable()->comment('市');
            $table->string('county', 20)->nullable()->comment('区');
            $table->string('address', 50)->nullable()->comment('详细地址');
            $table->boolean('is_default')->default(false)->comment('是默认地址');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('addresses');
    }
}
