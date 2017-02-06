const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

function relativeToPhoenixPriv(...paths) {
  return path.resolve(__dirname, "../../priv/static", ...paths)
}

module.exports = function(){
  return {
    entry: [
      'react-hot-loader/patch',
      //'webpack-dev-server/client?http://localhost:3000',
      //'webpack/hot/only-dev-server',
      './src/index.js',
      './style/app.sass'
    ],
    output: {
      //path: __dirname + '/build',
      path: relativeToPhoenixPriv(),
      filename: 'js/app.js',
      publicPath: '/'
    },
    devServer: {
      hot: true,
      contentBase: __dirname + '/build',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.(sass|scss|css)$/,
          loader: ExtractTextPlugin.extract({
            //fallback: 'style-loader',
            loader: [
              {
                loader: 'css-loader',
                query: {
                  //modules: true,
                  importLoaders: 1
                }
              },
              'postcss-loader',
              'sass-loader'
            ]
          })
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/,
          exclude: /node_modules/,
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        },
        {
          test: /\.(ico|txt)$/,
          exclude: /node_modules/,
          loader: 'file-loader',
          options: { name: '[name].[ext]' }
        }
      ]
    },
    devtool: 'inline-source-map',
    context: __dirname,
    plugins: [
      //new HTMLWebpackPlugin({template: './index.html'}),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new ExtractTextPlugin({
        filename: 'css/app.css',
        disable: false,
        allChunks: true
      }),
      new CopyWebpackPlugin([
        { from: './assets/' }
      ])
    ]
  }
};
