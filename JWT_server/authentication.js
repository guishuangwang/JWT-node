var jwt = require('jsonwebtoken');
var fs = require('fs');

var expireTime = '1h';

//从请求中获取登录凭证，用户名、密码
var getCredential = function() {

};
//登录验证， 判断用户名密码是否有效
var verifyCredential = function() {

};
//公钥
//私钥
//创建JWT
var _create = function() {

};
//从请求中获取token
var _getToken = function() {

};

module.exports = {
    //生成token
    generateToken: function() {

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