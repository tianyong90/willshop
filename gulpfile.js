const elixir = require('laravel-elixir');

require('laravel-elixir-vue');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(mix => {
    mix.sass('app.scss')
       .webpack('shop.js', 'public/js/shop.js');

    // mix.copy('node_modules/normalize.css/normalize.css', 'public/css/normalize.css');

    mix.browserSync({
        proxy: 'localhost:8050/shop'
    });
});
