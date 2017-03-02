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

const webpack = require('webpack');

mix.webpackConfig({
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "eslint-loader"
      },
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
    path: path.resolve(__dirname, "public/build"),
    publicPath: "/build/",
    filename: "[name].entry.js",
    chunkFilename: "[name].[chunkhash:8].js"
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
    'public/build/mix.entry.js',
    'public/build/shop.entry.js'
  ]);
}

mix.browserSync({
  proxy: 'localhost:8050/shop'
});