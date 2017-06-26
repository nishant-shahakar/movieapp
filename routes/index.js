var express = require('express');
var router = express.Router();
var user = require('./user');
var movies = require('./movies');

router.use('/user', user);
router.use('/movies', movies);

/* GET home page. */
router.get('/', function(req, res, next) {
	var obj = {
		name:'Movie app',
		status:'ok'
	}
  res.json(obj);
});

module.exports = router;