const webpack = require('webpack')

module.exports = {
  webpack: {
    configure: (config) => {
      const oneOfRule = config.module?.rules?.find((rule) => Array.isArray(rule.oneOf))

      if (oneOfRule) {
        oneOfRule.oneOf.unshift({
          test: /\.markdown\.md$/,
          type: 'asset/source',
        })
      }

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
