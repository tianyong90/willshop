const { mix } = require('laravel-mix');
const path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.js('resources/assets/js/app.js', 'public/js')
//    .sass('resources/assets/sass/app.scss', 'public/css');

const webpack = require('webpack');

mix.webpackConfig({
  module: {
    rules: [
      {
        test: /\.sa|css$/,
        exclude: /(node_modules|bower_components)/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  entry: {
    shop: './resources/assets/js/shop/index.js',
    vendor: ['vue', 'vuex', 'vue-router', 'axios']
  },
  output: {
    path: path.resolve(__dirname, "public/js"),
    publicPath: "/js/",
    filename: "[name].entry.js",
    chunkFilename: "[name].[chunkhash:8].js"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js'
    })
  ],
  externals: {
    // jquery: "jQuery"
  }
});

mix.js('resources/assets/js/shop/index.js', 'public/build');