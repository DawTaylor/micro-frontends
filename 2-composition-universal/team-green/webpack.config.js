const webpack = require('webpack')
const path = require('path')

module.exports = {

  mode: 'development',

  entry: {
    'bundle': './src/green-recos/index.js',
    'fragments': './src/client.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          }
        }
      }
    ]
  },
    
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: '[name].js'
  },

  devServer: {
    contentBase: './dist/',
    port: '8000',
    historyApiFallback: true,
    hot: true,
    open: true
  },

  watch:true,

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]

}