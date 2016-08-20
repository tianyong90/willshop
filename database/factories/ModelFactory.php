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
    return [
        'name' => $faker->name,
        'email' => $faker->safeEmail,
        'password' => bcrypt(str_random(10)),
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

    return [
        'name' => $faker->name,
        'category_id' => random_int(1, 3),
        'thumbnail' => $faker->imageUrl(100, 100),
        'pictures' => $pictures,
        'description' => $faker->sentence,
    ];
});
