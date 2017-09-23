<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('category_id')->comment('关联产品分类ID');
            $table->string('name', 30)->comment('商品名');
            $table->string('thumbnail', 120)->nullable()->comment('缩略图');
            $table->string('pictures', 300)->nullbale()->comment('图片集');
            $table->unsignedDecimal('price')->nullable()->comment('价格');
            $table->text('description')->nullable()->comment('商品描述');
            $table->unsignedInteger('stock')->default(0)->comment('库存');
            $table->enum('status', [
                'on_sale',
                'off_sale',
                'sortage',
            ])->default('on_sale')->comment('状态');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('category_id')->references('id')->on('product_categories')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('products');
    }
}
