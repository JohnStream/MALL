require('./login.css');
var _user   = require('../../../Service/user-service');

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
    submit : function(){
       var formdata = {
        username : $.trim($('#username').val()),
        password : $.trim($('#password').val())
       }
       _user.login(formdata,function(res){
           console.log(res);
    }, function(errMsg){
        console.log(errMsg);
    })
    }
}
$(function(){
    page.init();
});