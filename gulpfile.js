const elixir = require('laravel-elixir');
const path = require('path')
require('shelljs/global');

require('laravel-elixir-vue-2');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application as well as publishing vendor resources.
 |
 */

const webpack = require('webpack');

elixir(mix => {
    // 为了解决 element-ui 一些问题，需要修改 webpack 配置
    Elixir.webpack.mergeConfig({
        resolveLoader: {
            root: path.join(__dirname, 'node_modules'),
        },
        module: {
            loaders: [{
                test: /\.css$/,
                loader: 'style!css'
            }, {
                test: /\.scss$/,
                loader: 'style!css!sass'
            }]
        },
        entry: {
            shop: './resources/assets/js/shop/index.js',
            vendor: ['vue', 'vuex', 'vue-router', 'axios']
        },
        output: {
            publicPath: "/build/",
            filename: "[name].entry.js",
            chunkFilename: "[name].[chunkhash:8].js"
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                filename: 'vendor.js'
            })
            // new webpack.optimize.UglifyJsPlugin()
        ],
        externals: {
            // jquery: "jQuery"
        }
    });
    
    // if (elixir.config.production) {
    //     // 删除原构建的文件
    //     rm('-rf', path.join(__dirname, 'public/build'));
    // }

    // mix.version([
    //     'build/vendor.js',
    //     'build/shop.entry.js',
    // ]);

    mix.webpack('shop/index.js', 'public/build');

    mix.browserSync({
        proxy: 'localhost:8050/shop'
    });
});
