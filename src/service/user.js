"use strict";

var _res = require("../util/res");

var _user = {
  // 登录
  login: function(userInfo, resolve, reject) {
    _res.request({
      url: "/user/login",
      data: userInfo,
      method: "POST",
      success: resolve,
      error: reject
    });
  },
  // 注册
  register: function(userInfo, resolve, reject) {
    _res.request({
      url: "/user/register",
      data: userInfo,
      method: "POST",
      success: resolve,
      error: reject
    });
  },
  // 检查登录状态
  checkLogin : function(resolve, reject){
    _res.request({
        url     : '/user/getUserInfo',
        success : resolve,
        error   : reject
    });
}
};
module.exports = _user;
