const Encore = require('@symfony/webpack-encore')
const path = require('path')
const fs = require('fs')
const WebpackBar = require('webpackbar')

Encore
  // directory where compiled assets will be stored
  .setOutputPath('public/js')
  // public path used by the web server to access the output path
  .setPublicPath('/js')

  .addEntry('app', './resources/js/app.js')

  // will require an extra script tag for runtime.js
  // but, you probably want this, unless you're building a single-page app
  .disableSingleRuntimeChunk()

  .splitEntryChunks()

  .cleanupOutputBeforeBuild()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())

  .enableBuildNotifications()
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

  // 增加 resolve.alias
  .addAliases({
    '~': path.join(__dirname, './resources/js'),
  })

  // 在开发模式下使用自定义的规则
  // cache-loader 和 thread-loader 可以提高开发过程中频繁修改时的编译速度
  // IMPORTANT: 但生产模式构建不不可使用，否则会引起动态加载的模块无法完成代码分割
  if (Encore.isDevServer()) {
    Encore.addRule({
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
    }).addRule({
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
  }

// fetch the config, then modify it!
const config = Encore.getWebpackConfig()

// add an extension
// config.resolve.extensions.push('.json')

if (Encore.isDevServer()) {
  // 解决 hmr 模式开发可能出现 Invalid Host/Origin header
  config.devServer.disableHostCheck = true

  // https://github.com/symfony/webpack-encore/pull/564#issuecomment-501577281
  // 解决 CSS 的 HMR 问题 TODO: (经测试仍无效)
  Encore.disableCssExtraction()
}

// 下面这段生成一个静态的 webpack.config.compiled.js
// 可用于配置 PHPStorm中 webpack 功能
// preference -> language & frameworks -> javascript -> webpack
if (!Encore.isProduction()) {
  fs.writeFile('webpack.config.compiled.js', 'module.exports = ' + JSON.stringify(config),
    function (err) {
      if (err) {
        return console.log(err)
      }
      console.log('webpack.config.compiled.js written')
    })
}

// export the final config
module.exports = config
