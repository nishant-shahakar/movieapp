var express = require('express');
var movies = require('./moviesController.js');
var auth = require('./../../auth/auth.js');
var router = express.Router();

router
	.get('/',movies.get)
	.post('/',movies.addMovies);

router
	.post('/review/:id',auth.isAuthenticated,movies.rateMovies);
router
	.get('/top',auth.isAuthenticated,movies.topRated);

module.exports = router;