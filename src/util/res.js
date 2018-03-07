/*
 * @Author: pimliulu 
 * @Date: 2018-03-07 11:12:53 
 * @Last Modified by: pimliulu
 * @Last Modified time: 2018-03-07 11:52:37
 */
'use strict';
var res = {
    request: function (param) {
        var _this = this;
        $.ajax({
            url : param.url     || '',  //发送请求地址
            type        : param.method  || 'get',  //请求方式
            data        : param.data    || '', //如果不是字符串，将自动转换成字符串
            dataType    : param.type    || 'json', // 预期服务器返回的数据
            success     : function(res){
                
            },
            error       : function(res){

            }

        });
    }
}