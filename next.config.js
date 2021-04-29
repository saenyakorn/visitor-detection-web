/* eslint-disable */
const withOptimizedImages = require('next-optimized-images')
const withAntdLess = require('next-plugin-antd-less')

module.exports = withOptimizedImages(
  withAntdLess({
    optimizeImages: false, // need to change this to `true` later
    cssModules: true,
    lessVarsFilePath: './src/styles/theme.less',
    cssLoaderOptions: {},
    webpack: (config, options) => {
      // config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
      return config
    },
  })
)
