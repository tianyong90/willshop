<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
        'pictures' => 'array'
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
