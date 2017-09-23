<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Product
 *
 * @property-read \App\ProductCategory $category
 * @mixin \Eloquent
 * @property int $id
 * @property int $category_id 关联产品分类ID
 * @property string $name 商品名
 * @property string|null $thumbnail 缩略图
 * @property array $pictures 图片集
 * @property float|null $price 价格
 * @property string|null $description 商品描述
 * @property int $stock 库存
 * @property string $status 状态
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Product whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Product whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Product whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Product whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Product whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Product whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Product wherePictures($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Product wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Product whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Product whereStock($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Product whereThumbnail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Product whereUpdatedAt($value)
 */
class Product extends Model
{
    protected $fillable = [
        'product_id',
        'category_id',
        'thumbnail',
        'picutres',
        'description',
    ];

    protected $casts = [
        'pictures' => 'array',
    ];

    /**
     * 所属分类
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'category_id');
    }
}
