module.exports = function (api) {
  return {
    'presets': [
      ['env', {
        'modules': false,
        'targets': {
          'browsers': ['> 1%', 'last 2 versions', 'not ie <= 8']
        }
      }],
      'stage-2'
    ],
    'plugins': [
      'transform-runtime',
      ['import', {'libraryName': 'we-vue', 'style': true}, 'we-vue']
    ]
  }
}
