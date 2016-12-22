var express = require('express');
var router = express.Router();
//认证模块对象
var authAdmin = require('../authentication');

/* GET users listing. */
router.post('/', function(req, res, next) {
  res.json({
      code: 200,
      token: authAdmin.generateToken(req),
      result: '获取token'
  })
});

module.exports = router;
