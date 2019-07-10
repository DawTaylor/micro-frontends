const webpack = require('webpack');
const path = require('path');

module.exports = {

  entry: {
    bundle: './src/green-recos/index.js',
    fragments: './src/client.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: '[name].js'
  }

}