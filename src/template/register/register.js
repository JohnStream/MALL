"use strict";
require("./register.scss");
var _user = require("../../service/user.js");
var page = {
  init: function() {
    this.bindEvent();
  },
  bindEvent: function() {
    var _this = this;
    // 登录按钮的点击
    $(".floating-btn").click(function() {
      _this.submit();
    });
    // 如果按下回车，也进行提交
    $(".user-content").keyup(function(e) {
      // keyCode == 13 表示回车键
      if (e.keyCode === 13) {
        _this.submit();
      }
    });
  },
  // 提交表单
  submit: function() {
    var formData = {
      username: $.trim($("#username").val()),
      password: $.trim($("#password").val()),
      phone: $.trim($("#phone").val()),
      email: $.trim($("#email").val()),
      question: $.trim($("#question").val()),
      answer: $.trim($("#answer").val())
    };
    debugger;
    _user.register(
      JSON.stringify(formData),
      function(res) {
        console.log(res);
      },
      function(errMsg) {
        console.log(errMsg);
      }
    );
  }
};

$(function() {
  page.init();
});
