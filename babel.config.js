module.exports = {
  presets: [['next/babel']],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@app/*': './*',
        },
      },
    ],
    ['import', { libraryName: 'antd', style: true }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
}
