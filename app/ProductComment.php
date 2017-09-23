<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\ProductComment
 *
 * @mixin \Eloquent
 * @property int $id
 * @property int $product_id 关联商品ID
 * @property int $user_id 关联用户ID
 * @property string|null $comment 评论内容
 * @property int|null $rate 评分
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductComment whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductComment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductComment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductComment whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductComment whereRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductComment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductComment whereUserId($value)
 */
class ProductComment extends Model
{
    //
}
