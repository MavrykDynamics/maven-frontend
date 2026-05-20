const webpack = require('webpack')

module.exports = {
  webpack: {
    configure: (config) => {
      config.resolve = config.resolve || {}
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        assert: require.resolve('assert/'),
        buffer: require.resolve('buffer/'),
        crypto: require.resolve('crypto-browserify'),
        fs: false,
        process: require.resolve('process/browser.js'),
        stream: require.resolve('stream-browserify'),
        util: require.resolve('util/'),
        vm: require.resolve('vm-browserify'),
      }

      config.plugins = [
        ...(config.plugins || []),
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser.js',
        }),
      ]

      return config
    },
  },
}
