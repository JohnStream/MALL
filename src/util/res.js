/*
 * @Author: pimliulu 
 * @Date: 2018-03-26 11:13:49 
 * @Last Modified by: pimliulu
 * @Last Modified time: 2018-04-09 13:58:10
 */
"use strict";
const mock = require('./mock');

var _res = {
  
  // 网络请求
  request: function(param) {
    var _this = this;
    // Mock数据API
    mock();
    $.ajax({
      type: param.method || "get",
      url: param.url || "",
      data: param.data || "",
      dataType: param.type || "json",
      contentType:"application/json" || '',  
      // 成功
      success: function(res) {
        console.log(res)
        if (res.status === 0) {
          typeof param.success === "function" &&
            param.success(res.data, res.msg);
        } else if (res.status === 10) {
          _this.doLogin();
        } else if (res.status === 1) {
          typeof param.error === "function" && param.error(res.msg);
        }
      },
      error: function(err) {
        typeof param.error === "function" && param.error(err.statusText);
      }
    });
  },
  // 没有登录跳转到登录页面
  doLogin: function() {
    window.location.href =
      "./login.html?redirect=" + encodeURIComponent(window.location.href);
  },
  goHome: function() {
    window.location.href = "./index.html";
  }
};
module.exports = _res;
