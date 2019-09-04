const Purgecss = require('@fullhuman/postcss-purgecss')

const purgecss = Purgecss({
  // Specify the paths to all of the template files in your project
  content: [
    './resources/**/*.html',
    './resources/**/*.vue',
    // etc.
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  whitelist: ['html', 'body'],
  // 不处理的样式
  // element-ui, mdi, nprogress
  whitelistPatternsChildren: [/^el-/, /^v-/, /^mdi/, /^nprogress/],
})

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('postcss-import'),
    require('postcss-url'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
}
