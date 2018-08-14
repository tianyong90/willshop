let mix = require('laravel-mix');

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

mix.webpackConfig(webpack => {
  let plugins = [];

  if (mix.inProduction()) {
    // 生产环境中打包时先清理旧的打包文件
    const CleanWebpackPlugin = require('clean-webpack-plugin');
    plugins.push(new CleanWebpackPlugin('js', {
      root: path.join(__dirname, 'public'),
      // exclude:  ['shared.js'],
      verbose: true,
      dry: false
    }));

    // 包体分析
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    plugins.push(new BundleAnalyzerPlugin())
  }

  return {
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: path.resolve(__dirname, 'resources/assets/js'),
          exclude: /(node_modules)/,
          options: {
            formatter: require('eslint-friendly-formatter'),
            emitWarning: false
          }
        }
      ]
    },
    plugins: plugins
  }
})

mix.js('resources/assets/js/shop/index.js', 'js/shop.js')
  .js('resources/assets/js/admin/index.js', 'js/admin.js')
  // .extract(['vue', 'vuex', 'vue-router', 'axios', 'vue-axios'], 'js/vendor.js')

// scss
mix.sass('resources/assets/sass/shop.scss', 'css/shop.css')
  .sass('resources/assets/sass/admin.scss', 'css/admin.css');

// 仅在 production 模式下加版本
if (mix.inProduction()) {
  mix.version()
}

// 使用了 extract 方法后，需要下面这些处理，hmr 才能正常使用
Mix.listen('configReady', (webpackConfig) => {
  if (Mix.isUsing('hmr')) {
    // Remove leading '/' from entry keys
    webpackConfig.entry = Object.keys(webpackConfig.entry).reduce((entries, entry) => {
      entries[entry.replace(/^\//, '')] = webpackConfig.entry[entry];
      return entries;
    }, {});

    // Remove leading '/' from ExtractTextPlugin instances
    webpackConfig.plugins.forEach((plugin) => {
      if (plugin.constructor.name === 'ExtractTextPlugin') {
        plugin.filename = plugin.filename.replace(/^\//, '');
      }
    });
  }
});

mix.browserSync({
  proxy: 'willshop.test',
  startPath: '/admin',
  open: false,
  reloadOnStart: true
});
