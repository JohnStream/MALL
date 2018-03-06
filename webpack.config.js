/*
 * @Author: pimliulu 
 * @Date: 2018-03-05 10:53:46 
 * @Last Modified by: pimliulu
 * @Last Modified time: 2018-03-06 15:05:30
 */
var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
// 多入口配置
var getEntry = function () {
  var entry = {};
  // [ './Test/index/Greeter.js', './Test/index/index.js' ]
  glob.sync('./Test/**/*.js').forEach(function (name) {
    var n = name.slice(name.lastIndexOf('Test/') + 5, name.length - 3);
    n = n.slice(0, n.lastIndexOf('/'));
    entry[n] = name;
  });
  console.log(entry);
  return entry;
};
// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function (name, title) {
  return {
    template: './Test/Index/' + name + '.html',
    filename: './view/' + name + '.html',
    title: title,
    inject: true,
    hash: true
  };
};


var config = {
  entry: getEntry(),
  output: {
    path: './dist',
    publicPath: './dist',
    filename: 'js/[name].js'
  },
  devServer: {
    contentBase: './dist'
  },
  // 外部扩展 防止将某些 import 的包(package)打包
  externals: {
    'jquery': 'window.jQuery'
  },
  // 模块
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: "img/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 公共模块处理
    // new webpack.optimize.CommonsChunkPlugin({

    // }),
    new ExtractTextPlugin("css/[name].css"),
    // 处理html模板，由于这里是商城，所以会有多个模板
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new CleanWebpackPlugin('dist')
  ]
};

module.exports = config;
