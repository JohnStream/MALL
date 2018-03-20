require('../common/nav/index.js')
var res = require('../../util/res');
var userInfo = {
    username :'132',
    password :'123'
}
res.request({
    url :'/user',
    data    : userInfo,
    method  : 'POST'
});