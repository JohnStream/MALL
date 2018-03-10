require('./index.css')
var res = require('../../util/res')
var param = {
     url: '/product/list.do?pageNum=1&pageSize=10&orderBy=default&keyword=%E6%89%8B%E6%9C%BA',
}
res.getQueryString('keyword');