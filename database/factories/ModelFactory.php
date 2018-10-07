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

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\ProductCategory::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->colorName,
        'parent_id' => 0,
        'description' => $faker->sentence,
        'thumbnail' => 'https://picsum.photos/200/200/?random',
    ];
});

$factory->define(App\Product::class, function (Faker\Generator $faker) {
    $pictures = [
        'https://picsum.photos/640/480/?random',
        'https://picsum.photos/640/480/?random',
        'https://picsum.photos/640/480/?random',
    ];

    $productCateIds = array_column(\App\ProductCategory::all('id')->toArray(), 'id');

    return [
        'name' => $faker->name,
        'category_id' => $productCateIds[array_rand($productCateIds)],
        'thumbnail' => 'https://picsum.photos/100/100/?random',
        'pictures' => $pictures,
        'price' => $faker->randomFloat(2, 1, 250),
        'stock' => random_int(10, 1000),
        'description' => $faker->paragraph(10),
    ];
});

$factory->define(App\Post::class, function (Faker\Generator $faker) {
    return [
        'title' => $faker->sentence(mt_rand(3, 10)),
        'content' => $faker->text,
        'published_at' => $faker->dateTimeBetween('-1 month', '+3 days'),
    ];
});

$factory->define(App\Address::class, function (Faker\Generator $faker) {
    return [
        'user_id' => 1,
        'name' => $faker->name,
        'mobile' => $faker->phoneNumber,
        'province' => $faker->state,
        'city' => $faker->city,
        'county' => $faker->streetName,
        'address' => $faker->streetAddress,
        'postcode' => $faker->postcode,
        'address_code' => '420528',
    ];
});
