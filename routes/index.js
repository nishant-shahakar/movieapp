var express = require('express');
var router = express.Router();
var user = require('./user');

router.use('/user', user);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendStatus(200);
});

module.exports = router;