<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\ProductCategory
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Product[] $products
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\ProductCategory[] $subCategories
 * @mixin \Eloquent
 * @property int $id
 * @property int|null $parent_id 父分类ID
 * @property string $name 分类名
 * @property string $description 分类描述
 * @property string $thumbnail 分类图标
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductCategory whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductCategory whereParentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductCategory whereThumbnail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductCategory whereUpdatedAt($value)
 */
class ProductCategory extends Model
{
    protected $fillable = [
        'name',
        'parent_id',
        'description',
        'thumbnail',
    ];

    /**
     * 子分类
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function subCategories()
    {
        return $this->hasMany(ProductCategory::class, 'parent_id');
    }

    /**
     * 分类下的商品
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function products()
    {
        return $this->hasMany(Product::class, 'category_id');
    }
}
