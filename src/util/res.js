/*
 * @Author: pimliulu 
 * @Date: 2018-03-07 11:12:53 
 * @Last Modified by: pimliulu
 * @Last Modified time: 2018-03-09 15:56:59
 */
'use strict';
var res = {
    request: function (param) {
        $.ajax({
            url: param.url || '',  //发送请求地址
            type: param.method || 'get',  //请求方式
            data: param.data || '', //如果不是字符串，将自动转换成字符串
            dataType: param.type || 'json', // 预期服务器返回的数据
            // 连接成功
            success: function (res) {
                // 请求成功
                if (res.status === 0) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 没有登录状态，需要强制登录
                else if (res.status === 10) {
                    Console.log("没有登录")
                }
                // 请求数据错误
                else if (res.status === 1) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            // 连接失败
            error: function (res) {
                typeof param.error === 'function' && param.error(err.statusText);
            }

        });
    },
    // 获取url参数
    getQueryString: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        // search	从问号 (?) 开始的 URL（查询部分）
        var result = window.location.search.substr(1).match(reg);
        console.log(result[2])
        if (result != null) {
            return decodeURIComponent(result[2]);
        }
    }
}
module.exports = res;