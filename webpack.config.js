const Encore = require('@symfony/webpack-encore')
const path = require('path')
const fs = require('fs')
const WebpackBar = require('webpackbar')

Encore
  .setOutputPath('public/js/')
  .setPublicPath('/') // TODO: 待确认
  .addEntry('shop', './resources/js/shop/index.ts')
  .addEntry('admin', './resources/js/admin/index.tsx')
  .enableSingleRuntimeChunk()

  .cleanupOutputBeforeBuild().enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())

  .enableVueLoader()
  .enableTypeScriptLoader()
  .enableForkedTypeScriptTypesChecking(() => ({
    // 限制生产构建时使用的内存大小，防止在生产机上构建占用过多内存
    memoryLimit: process.env.NODE_ENV === 'production' ? 1024 : 2048,
    checkSyntacticErrors: true,
    tslint: false, // 暂不使用 tslint
    formatter: 'codeframe', // codeframe 可以指明错误出现的具体位置
    tsconfig: path.resolve('./tsconfig.json'),
  }))
  .enableSassLoader(options => {
    options.implementation = require('sass')
  })
  .enablePostCssLoader()
  .configureFriendlyErrorsPlugin()
  .addPlugin(new WebpackBar())

  .enableReactPreset()
  // 增加 resolve.alias
  .addAliases({
    '@/': path.join(__dirname, './resources/js/'),
  })

// fetch the config, then modify it!
const config = Encore.getWebpackConfig()

// add an extension
// config.resolve.extensions.push('.json')

if (Encore.isDevServer()) {
  config.devServer.disableHostCheck = true

  // https://github.com/symfony/webpack-encore/pull/564#issuecomment-501577281
  // 解决 CSS 的 HMR 问题 TODO: (经测试仍无效)
  Encore.disableCssExtraction()
}

config.module.rules.push({
  test: /\.js$/,
  use: [
    {
      loader: 'cache-loader',
      options: {
        cacheDirectory: path.resolve('./node_modules/.cache/babel-loader'),
      },
    },
    'thread-loader',
    'babel-loader',
  ],
  include: path.resolve(__dirname, 'resources/js'),
})

config.module.rules.push({
  test: /\.ts$/,
  use: [
    {
      loader: 'cache-loader',
      options: {
        cacheDirectory: path.resolve('./node_modules/.cache/ts-loader'),
      },
    },
    'thread-loader',
    'babel-loader',
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        happyPackMode: true,
      },
    },
  ],
  include: path.resolve(__dirname, 'resources/js'),
})

// 下面这段生成一个静态的 webpack.config.compiled.js
// 可用于配置 PHPStorm中 webpack 功能
// preference -> language & frameworks -> javascript -> webpack
const compiledConfig = Encore.getWebpackConfig()
if (!Encore.isProduction()) {
  fs.writeFile('webpack.config.compiled.js', 'module.exports = ' + JSON.stringify(compiledConfig),
    function (err) {
      if (err) {
        return console.log(err)
      }
      console.log('webpack.config.compiled.js written')
    })
}

// export the final config
module.exports = config
