/* eslint-disable */
const withOptimizedImages = require('next-optimized-images')
const withAntdLess = require('next-plugin-antd-less')

module.exports = withOptimizedImages(
  withAntdLess({
    distDir: 'build',
    optimizeImages: false, // need to change this to `true` later
    cssModules: true,
    lessVarsFilePath: 'src/styles/variables.less',
    lessVarsFilePathAppendToEndOfContent: false,
    cssLoaderOptions: {},
    webpack: (config, options) => {
      // config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
      return config
    },
  }),
)
