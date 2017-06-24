var express = require('express');
var debug = require('debug')('movieapp:users');
var user = require('./userController.js');
var router = express.Router();


router
	.get('/',user.get)
	.post('/',user.register);

router
	.post('/token',user.get);

router
	.post('/genre',user.get);

module.exports = router;
