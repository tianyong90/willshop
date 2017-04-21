const { mix } = require('laravel-mix');

const path = require('path');
require('shelljs/global');

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

const webpack = require('webpack');mix.disableNotifications();

mix.setResourceRoot('/build/');

mix.webpackConfig({
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader'
      }
    ]
  },
  entry: {
    shop: './resources/assets/js/shop/index.js',
    vendor: ['vue', 'vuex', 'vue-router', 'axios', 'vue-axios', 'we-vue']
  },
  output: {
    path: path.resolve(__dirname, 'public/build'),
    publicPath: '/build/',
    filename: '[name].js',
    chunkFilename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash:8].js' :'[name].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js'
    })
  ]
});

if (process.env.NODE_ENV === 'production') {
  // 删除原构建的文件
  rm('-rf', path.join(__dirname, 'public/build'));

  mix.version([
    'public/build/vendor.js',
    'public/build/mix.js',
    'public/build/shop.js'
  ]);
}

mix.browserSync({
  proxy: 'localhost:8050/shop',
  files: [
    'app/**/*.php',
    'resources/views/**/*.php',
    'public/js/**/*.js',
    'public/css/**/*.css',
    'public/build/**/*.js',
  ]
});
