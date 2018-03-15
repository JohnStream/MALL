/*
 * @Author: pimliulu 
 * @Date: 2018-03-05 10:53:46 
 * @Last Modified by: pimliulu
 * @Last Modified time: 2018-03-14 16:13:55
 */
var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
// 多入口配置
var getEntry = function () {
  // 'index'             : ['./src/page/index/index.js']
  var entry = {};
  // [ './Test/index/Greeter.js', './Test/index/index.js' ]
  glob.sync('./src/template/**/*.js').forEach(function (name) {
    var n = name.slice(name.lastIndexOf('src/template/') + 13, name.length - 3);
    var names = [];
    console.log(n); // index/index
    n = n.slice(0, n.lastIndexOf('/'));
    console.log(n); // index
    names.push(name)
    if ('dev' === WEBPACK_ENV) {
      names.push('webpack-dev-server/client?http://localhost:8088/');
    }
    entry[n] = names;
  });
  console.log(entry);
  return entry;
};
// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function (name, title) {
  return {
    template: './src/view/' + name + '.html',
    filename: './view/' + name + '.html',
    title: title,
    inject: true
  };
};

var config = {
  entry: getEntry(),
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: '/dist',
    filename: 'js/[name].js'
  },
  // 外部扩展 防止将某些 import 的包(package)打包
  externals: {
    'jquery': 'window.jQuery'
  },
  // 别名
  resolve: {
    alias: {
      node_modules: __dirname + '/node_modules',
      util: __dirname + '/src/util',
      template: __dirname + '/src/template',
      image: __dirname + '/src/images'
    }
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
              name: "images/[name].[ext]"
            }
          }
        ]
      },
      // 防止和HtmlWebpackPlugin冲突，改成ejs模板
      {
        test: /\.tpl$/,
        use: {
          loader: 'html-loader'
        }
      }
    ]
  },
  plugins: [
    // 公共模块处理
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    }),
    // 把css单独打包到文件里
    new ExtractTextPlugin("css/[name].css"),
    // 处理html模板，由于这里是商城，所以会有多个模板
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页'))
  ],
  // 代理设置，解决跨域问题
  devServer: {
    proxy: {
      '/product': {
        target: 'http://happymmall.com/',
        changeOrigin: true
      }
    }
  }
};

module.exports = config;
