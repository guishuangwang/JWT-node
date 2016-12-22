//用户登录信息保存，暂时只用数组记录
var USERS = [{
    id: 1,
    username: 'weichao',
    password: 'weichao'
}, {
    id: 2,
    username: 'chaoge',
    password: 'chaoge'
}];

module.exports = {
    getUser: function (username, password) {
        var user = USERS.filter(function (val, index, arr) {
            return val.username === username && val.password === password;
        });
        return user.length === 0 ? false : user[0];
    }
};