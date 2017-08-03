var jwt = require('jsonwebtoken');
var fs = require('fs');
var users = require('./user/users');

var expireTime = '1h';

//从请求中获取登录凭证，用户名、密码
var getCredential = function(req) {
    return {
        username: req.body.username || req.query.username,
        password: req.body.password || req.body.password
    }
};
//登录验证， 判断用户名密码是否有效
var verifyCredential = function(formData) {
    return users.getUser(formData.username, formData.password);
};
//公钥
var pub_cert = fs.readFileSync('rsa_public_key.pem');

//私钥
var pri_cert = fs.readFileSync('rsa_private_key.pem');

//创建JWT
var _create = function(data) {
    var payload = {};
    payload.data = data;
    return jwt.sign(payload, pri_cert, {
        expiresIn: expireTime,
        algorithm: 'RS256',
        noTimestamp: true
    });
};
//从请求中获取token
var _getToken = function() {

};

module.exports = {
    //生成token
    generateToken: function(req) {
        var data = verifyCredential(getCredential(req));
        if(!data) {
            return '';
        }
        else {
            return _create(data);
        }
    },
    //验证token，得到其中的payload
    verify: function() {

    },
    //获取token中的用户信息
    getUserInfo: function() {

    },
    //刷新token
    refreshToken: function() {

    }
};