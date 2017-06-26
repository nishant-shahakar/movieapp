var express = require('express');
var user = require('./userController.js');
var auth = require('./../../auth/auth.js');
var router = express.Router();


router
	.get('/',auth.isAuthenticated,user.get)
	.post('/',user.register);

router
	.post('/token',user.generateToken);

router
	.get('/genre',auth.isAuthenticated,user.getGenre)
	.post('/genre',auth.isAuthenticated,user.addGenre)
	.put('/genre',auth.isAuthenticated,user.get);

router
	.get('/recommend',auth.isAuthenticated,user.getRecommendation);

module.exports = router;
