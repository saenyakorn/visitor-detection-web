/* eslint-disable */
const withOptimizedImages = require('next-optimized-images')
const withAntdLess = require('next-plugin-antd-less')

module.exports = withOptimizedImages(
  withAntdLess({
    distDir: 'build',
    optimizeImages: false, // need to change this to `true` later
    cssModules: true,
    lessVarsFilePath:
      process.env.NODE_ENV !== 'production'
        ? 'src/styles/variables.less'
        : 'dist/styles/variables.less',
    lessVarsFilePathAppendToEndOfContent: false,
    cssLoaderOptions: {
      importLoaders: 1,
    },
    future: {
      webpack5: true,
    },
    webpack: (config, options) => {
      return config
    },
  }),
)
