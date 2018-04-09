const Mock = require('mockjs')
const _mock = function(){
    // 登录成功
    Mock.mock('/user/checkLogin',{
        "status": 0,
        "msg": "登录成功",
        "data": {
            "id|1-100": 100,// //随机生成一个数字 大小在11到100
            "userName": '@name',
            "email": '@email',
            "phone": /^1[0-9]{10}$/, //用正则匹配1开头的11位数字的手机号
            "createTime": "@date('yyyy-MM-dd')",
            "updateTime": "@date('yyyy-MM-dd')"
        }  
    });
} 
module.exports = _mock;