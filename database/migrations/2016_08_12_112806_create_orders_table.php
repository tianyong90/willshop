<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->string('number', '20')->comment('订单号');
            $table->unsignedInteger('user_id')->comment('所属会员');
            $table->unsignedDecimal('total_fee')->comment('总费用');
            $table->enum('status', ['need_to_pay', 'paid', 'delivered', 'finished', 'canceled'])->comment('订单状态');
            $table->string('consumer_name', 20)->default('')->comment('收货人姓名');
            $table->string('consumer_mobile', 12)->default('')->comment('收货人手机');
            $table->string('address', 100)->default('')->comment('收货地址');
            $table->string('postcode', 6)->default('')->comment('邮编');
            $table->string('remark', 50)->default('')->comment('用户备注');
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
        Schema::drop('orders');
    }
}
