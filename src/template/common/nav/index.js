require('./index.css')
var _user = require('../../../service/user');
var nav = {
    init: function(){
        this.loadUserInfo();
    },
    loadUserInfo : function(){
        _user.checkLogin(function(res){
            console.log(res)
            $('.not-login').hide().siblings('.userlogin').show()
                .find('.username').text(res.userName);
        }, function(errMsg){
            // do nothing
            console.log(errMsg)
        });
    }
}
module.exports = nav.init();