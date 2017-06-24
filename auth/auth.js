var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var db = require("./../utils/redisClient.js").db;
var redisPrefix = 'mapp:';

passport.use(new BearerStrategy(
  function(accessToken, callback) {
  	key = redisPrefix+accessToken;
  	db.get(key,function(err,user){
     	if (err) { return callback(err); }
     	if(!user){ return callback(null, false); }
       	callback(null,user,{ scope: '*' });
    });
  }
));

exports.isAuthenticated = function(req,res,next){
 passport.authenticate('bearer', { session: false },function(err,user,info){
    if (err){
   		next({status:500,message:"Something went wrong."});
   		return;
    }
    if (user){
      req.userId = user;
      return next();
    }
    return next({status:401,message:"Unauthorized"});
	})(req, res);
 };