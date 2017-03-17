var nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  entry: './functions/handler.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'babel'
        ],
        exclude: /node_modules/,
      }
    ]
  },
  externals: [nodeExternals()]
}
