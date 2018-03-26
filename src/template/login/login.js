'use strict'
require('./login.css');
var _user = require('../../service/user.js')
var page = {
    init: function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        // 登录按钮的点击
        $('.floating-btn').click(function(){
            _this.submit();
        });
        // 如果按下回车，也进行提交
        $('.user-content').keyup(function(e){
            // keyCode == 13 表示回车键
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    // 提交表单
    submit : function(){
        var formData = {
                username : $.trim($('#username').val()),
                password : $.trim($('#password').val())
            }
            _user.login(JSON.stringify(formData),function(res){
                window.location.href = './index.html';
            },function(errMsg){
                console.log(errMsg)
            })       
    },
};
$(function(){
    page.init();
});