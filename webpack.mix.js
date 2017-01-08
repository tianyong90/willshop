let mix = require('laravel-mix').mix;
const path = require('path')
require('shelljs/global');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

// mix.js('resources/assets/js/app.js', 'public/js')
//    .sass('resources/assets/sass/app.scss', 'public/css');

const webpack = require('webpack');

mix.webpackConfig({
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
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

mix.js('resources/assets/js/shop/index.js', 'public/build');