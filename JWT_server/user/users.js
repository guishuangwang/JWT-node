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
    getUser: (usr, pwd) => {
        console.log('usr:' + usr + 'pwd:' + pwd);
        let user = USERS.filter((val, index, arr) => {
            return val.username === usr && val.password === pwd;
        });
        return user.length === 0 ? false : user[0];
    }
};