<?php
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App{
/**
 * App\Address
 *
 * @property int $id
 * @property int $user_id 用户ID
 * @property string|null $name 收货人
 * @property string|null $mobile 手机号
 * @property string|null $postcode 邮编
 * @property string|null $province 省
 * @property string|null $city 市
 * @property string|null $area 区
 * @property string|null $address 详细地址
 * @property bool $is_default 是默认地址
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property-read \App\User $user
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Address onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereArea($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereIsDefault($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereMobile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address wherePostcode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereProvince($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Address withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Address withoutTrashed()
 */
	class Address extends \Eloquent {}
}

namespace App{
/**
 * App\Brand
 *
 */
	class Brand extends \Eloquent {}
}

namespace App{
/**
 * App\Cart
 *
 * @property int $id
 * @property int $user_id 用户ID
 * @property int $product_id 产品ID
 * @property int $amount 数量
 * @property string|null $checkouted_at 结算时间
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property-read \App\Product $product
 * @property-read \App\User $user
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Cart onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Cart whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Cart whereCheckoutedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Cart whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Cart whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Cart whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Cart whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Cart whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Cart whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Cart withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Cart withoutTrashed()
 */
	class Cart extends \Eloquent {}
}

namespace App{
/**
 * App\Favourite
 *
 * @property int $user_id 用户ID
 * @property int $product_id 产品ID
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property-read \App\Product $product
 * @property-read \App\User $user
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Favourite onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Favourite whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Favourite whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Favourite whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Favourite whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Favourite whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Favourite withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Favourite withoutTrashed()
 */
	class Favourite extends \Eloquent {}
}

namespace App{
/**
 * App\Order
 *
 * @property int $id
 * @property string $number 订单号
 * @property int $user_id 所属会员
 * @property float $total_fee 总费用
 * @property string $status 订单状态
 * @property string $consumer_name 收货人姓名
 * @property string $consumer_mobile 收货人手机
 * @property string $address 收货地址
 * @property string $postcode 邮编
 * @property string $remark 用户备注
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\OrderItem[] $order_items
 * @property-read \App\User $user
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Order onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereConsumerMobile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereConsumerName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order wherePostcode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereRemark($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereTotalFee($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Order withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Order withoutTrashed()
 */
	class Order extends \Eloquent {}
}

namespace App{
/**
 * App\OrderItem
 *
 * @property int $id
 * @property int $order_id 关联订单ID
 * @property int $product_id 关联产品ID
 * @property float $unit_price 单价
 * @property int $amount 数量
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property-read \App\Order $order
 * @property-read \App\Product $product
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\OrderItem onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderItem whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderItem whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderItem whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderItem whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderItem whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderItem whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\OrderItem withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\OrderItem withoutTrashed()
 */
	class OrderItem extends \Eloquent {}
}

namespace App{
/**
 * App\Post
 *
 * @property int $id
 * @property string $slug
 * @property string $title 标题
 * @property string $content 内容
 * @property \Carbon\Carbon|null $published_at 发布时间
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Post onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post wherePublishedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Post whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Post withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Post withoutTrashed()
 */
	class Post extends \Eloquent {}
}

namespace App{
/**
 * App\Product
 *
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
 * @property-read \App\ProductCategory $category
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Product onlyTrashed()
 * @method static bool|null restore()
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
 * @method static \Illuminate\Database\Query\Builder|\App\Product withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Product withoutTrashed()
 */
	class Product extends \Eloquent {}
}

namespace App{
/**
 * App\ProductCategory
 *
 * @property int $id
 * @property int|null $parent_id 父分类ID
 * @property string $name 分类名
 * @property string $description 分类描述
 * @property string $thumbnail 分类图标
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Product[] $products
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\ProductCategory[] $subCategories
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\ProductCategory onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductCategory whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductCategory whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductCategory whereParentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductCategory whereThumbnail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductCategory whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ProductCategory withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\ProductCategory withoutTrashed()
 */
	class ProductCategory extends \Eloquent {}
}

namespace App{
/**
 * App\ProductComment
 *
 * @property int $id
 * @property int $product_id 关联商品ID
 * @property int $user_id 关联用户ID
 * @property string|null $comment 评论内容
 * @property int|null $rate 评分
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\ProductComment onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductComment whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductComment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductComment whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductComment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductComment whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductComment whereRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductComment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\ProductComment whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ProductComment withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\ProductComment withoutTrashed()
 */
	class ProductComment extends \Eloquent {}
}

namespace App{
/**
 * App\User
 *
 * @property int $id
 * @property string $name 用户名
 * @property string|null $avatar
 * @property string|null $mobile
 * @property string|null $email
 * @property string $password 密码
 * @property string $openid OPENID
 * @property string $nickname 昵称
 * @property string $remark 备注
 * @property string $sex 性别
 * @property string $language 语言
 * @property string $city 城市
 * @property string $province 省
 * @property string $country 国家
 * @property string $headimgurl 头像
 * @property int|null $unionid unionid
 * @property int|null $subscribe 是否已关注
 * @property \Carbon\Carbon|null $subscribe_time 关注时间
 * @property int $groupid 粉丝组groupid
 * @property array $tagid_list 微信用户标签ID列表
 * @property \Carbon\Carbon|null $last_online_at 最后一次在线时间
 * @property string|null $remember_token
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Client[] $clients
 * @property-read string $location
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Permission[] $permissions
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Role[] $roles
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Token[] $tokens
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\User onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User permission($permissions)
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User role($roles)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereAvatar($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereGroupid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereHeadimgurl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereLastOnlineAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereMobile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereNickname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereOpenid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereProvince($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereRemark($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereSex($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereSubscribe($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereSubscribeTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereTagidList($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUnionid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\User withoutTrashed()
 */
	class User extends \Eloquent {}
}

