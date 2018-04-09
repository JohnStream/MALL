/*
 * @Author: pimliulu 
 * @Date: 2018-03-05 10:53:46 
 * @Last Modified by: pimliulu
 * @Last Modified time: 2018-04-09 18:56:30
 */
var webpack = require("webpack");
var path = require("path");
var glob = require("glob");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var WEBPACK_ENV = process.env.WEBPACK_ENV || "dev";
var getHtmlConfig = function(name, title) {
  return {
    template: "./src/view/" + name + ".html",
    filename: "./view/" + name + ".html",
    title: title,
    inject: true,
    chunks: ["common", name]
  };
};

var config = {
  entry: {
    common: ["./src/template/common/index.js"],
    index: ["./src/template/index/index.js"],
    login: ["./src/template/login/login.js"],
    register: ["./src/template/register/register.js"]
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist",
    filename: "js/[name].js"
  },
  // 外部扩展 防止将某些 import 的包(package)打包
  externals: {
    jquery: "window.jQuery"
  },
  // 别名
  resolve: {
    alias: {
      node_modules: __dirname + "/node_modules",
      util: __dirname + "/src/util",
      template: __dirname + "/src/template",
      service: __dirname + "/src/service"
    }
  },
  // 模块
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ],
          // 在开发环境使用 style-loader
          fallback: "style-loader"
        })
      },
      {
        test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: "images/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.string$/,
        use:["html-loader"]
      }
    ]
  },
  plugins: [
    // 公共模块处理
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      filename: "js/base.js"
    }),
    // 把css单独打包到文件里
    new ExtractTextPlugin("css/[name].css"),
    // 处理html模板，由于这里是商城，所以会有多个模板
    new HtmlWebpackPlugin(getHtmlConfig("index", "首页")),
    new HtmlWebpackPlugin(getHtmlConfig("login", "登录")),
    new HtmlWebpackPlugin(getHtmlConfig("register", "注册"))
  ]
  // 代理设置，解决跨域问题
  // devServer: {
  //   proxy: {
  //     '/user': {
  //       target: 'http://localhost:5000/',
  //       changeOrigin: true
  //     }
  //   }
  // }
};

module.exports = config;
