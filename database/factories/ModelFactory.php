<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\ProductCategory::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->colorName,
        'parent_id' => 0,
        'description' => $faker->sentence,
        'thumbnail' => $faker->imageUrl(200, 200),
    ];
});

$factory->define(App\Product::class, function (Faker\Generator $faker) {
    $pictures = [
        $faker->imageUrl(640, 360),
        $faker->imageUrl(640, 360),
        $faker->imageUrl(640, 360),
    ];

    $productCateIds = array_column(\App\ProductCategory::all('id')->toArray(), 'id');

    return [
        'name' => $faker->name,
        'category_id' => $productCateIds[array_rand($productCateIds)],
        'thumbnail' => $faker->imageUrl(100, 100),
        'pictures' => $pictures,
        'price' => $faker->randomFloat(2, 1, 250),
        'description' => $faker->paragraph(10),
    ];
});

$factory->define(App\Post::class, function (Faker\Generator $faker) {
    return [
        'title'        => $faker->sentence(mt_rand(3, 10)),
        'content'      => implode("\n\n", $faker->paragraphs(mt_rand(3, 6))),
        'published_at' => $faker->dateTimeBetween('-1 month', '+3 days'),
    ];
});
