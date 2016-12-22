var express = require('express');
var router = express.Router();
//认证模块对象
var authAdmin = require('../authentication');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var userInfo = authAdmin.getUserInfo(req);
  var token = authAdmin.refreshToken(req);
  res.json({
    code: 200,
    userInfo: userInfo,
    token: token
  })
});

module.exports = router;
