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
 * @property-read \App\User $user
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Address onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Query\Builder|\App\Address withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Address withoutTrashed()
 */
	class Address extends \Eloquent {}
}

namespace App{
/**
 * App\Cart
 *
 * @property-read \App\Product $product
 * @property-read \App\User $user
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Cart onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Query\Builder|\App\Cart withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Cart withoutTrashed()
 */
	class Cart extends \Eloquent {}
}

namespace App{
/**
 * App\Favourite
 *
 * @property-read \App\Product $product
 * @property-read \App\User $user
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Favourite onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Query\Builder|\App\Favourite withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Favourite withoutTrashed()
 */
	class Favourite extends \Eloquent {}
}

namespace App{
/**
 * App\Order
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\OrderItem[] $order_items
 * @property-read \App\User $user
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Order onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Query\Builder|\App\Order withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Order withoutTrashed()
 */
	class Order extends \Eloquent {}
}

namespace App{
/**
 * App\OrderItem
 *
 * @property-read \App\Order $order
 * @property-read \App\Product $product
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\OrderItem onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Query\Builder|\App\OrderItem withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\OrderItem withoutTrashed()
 */
	class OrderItem extends \Eloquent {}
}

namespace App{
/**
 * App\Post
 *
 * @property-write mixed $title
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Post onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Query\Builder|\App\Post withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Post withoutTrashed()
 */
	class Post extends \Eloquent {}
}

namespace App{
/**
 * App\Product
 *
 * @property-read \App\ProductCategory $category
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Product onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Query\Builder|\App\Product withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Product withoutTrashed()
 */
	class Product extends \Eloquent {}
}

namespace App{
/**
 * App\ProductCategory
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Product[] $products
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\ProductCategory[] $subCategories
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\ProductCategory onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Query\Builder|\App\ProductCategory withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\ProductCategory withoutTrashed()
 */
	class ProductCategory extends \Eloquent {}
}

namespace App{
/**
 * App\ProductComment
 *
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\ProductComment onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Query\Builder|\App\ProductComment withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\ProductComment withoutTrashed()
 */
	class ProductComment extends \Eloquent {}
}

namespace App{
/**
 * App\User
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Client[] $clients
 * @property-read string $location
 * @property-read string $sex
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Permission[] $permissions
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Role[] $roles
 * @property-write mixed $subscribe_time
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Token[] $tokens
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\User onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User permission($permissions)
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User role($roles)
 * @method static \Illuminate\Database\Query\Builder|\App\User withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\User withoutTrashed()
 */
	class User extends \Eloquent {}
}

