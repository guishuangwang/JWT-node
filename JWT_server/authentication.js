var jwt = require('jsonwebtoken');
var fs = require('fs');
var users = require('./user/users');

var expireTime = '1h';

//从请求中获取登录凭证，用户名、密码
var getCredential = function(req) {
    return {
        username: req.body.username || req.query.username,
        password: req.body.password || req.query.password
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
var _getToken = function(req) {
    //假设客户端将token放在header或者查询参数中
    //按如下规则获取
    var token = '';
    var auArray = req.headers.authorization && req.headers.authorization.split(' ');

    if(auArray && auArray[0] === 'Bearer') {
        token = auArray[1];
    }
    else if(req.query && req.query.token) {
        token = req.query.token;
    }
    return token;
};

//验证token，得到其中的payload
var _verify = function(req) {
    var token = _getToken(req);
    if(!token)
        return false;
    
    var payload = null;
    try {
        payload = jwt.verify(token, pub_cert, {algorithms: 'RS256'});
    }
    catch (err) {
        console.log(err);
    }
    return payload;
};

module.exports = {
    //生成token
    generateToken: function(req) {
        var data = verifyCredential(getCredential(req));
        console.log('获取到的用户：' + data);
        if(!data) {
            return '';
        }
        else {
            return _create(data);
        }
    },
    //验证token，得到其中的payload
    verify: function(req) {
        return _verify(req);
    },
    //获取token中的用户信息
    getUserInfo: function(req) {
        var payload = _verify(req);
        return payload && payload.data;
    },
    //刷新token
    refreshToken: function(req) {
        var payload = _verify(req);
        if(payload) {
            return _create(payload.data);
        }
        else return '';
    }
};