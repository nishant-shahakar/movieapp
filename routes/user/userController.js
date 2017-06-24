var debug = require('debug')('movieapp:usersCtr');
var User = require('./userModel.js');
var db = require('./../../utils/redisClient.js').db;
var redisPrefix = 'mapp:';
var token = require('./../../utils/token.js');

exports.get = function(req,res,next) {
	var id = req.userId;
	User.findOne({ _id: id },'email genre created ',function (err, user) {
		if (err) { 
			var error = {
	    		message:'Some thing went wrong',
	    		status:500
	    	};
		  	return next(error); 
		  }
		res.json(user || {});
	});
};
exports.register = function(req,res,next) {
	var user = new User({
		email:req.body.email,
		password:req.body.password
	});
	user.save(function(err,newUser) {
	    if (err){
	    	var error = {
	    		message:'Some thing went wrong',
	    		status:500
	    	};
	    	debug('Mongodb:Error inserting');
	    	debug(err);
	    	return next(error);
	    }
	    var tkn = token.uid(20);
	    var success = {
	    	message:'User added succesfully',
	    	token:tkn
	    };
		res.json(success);
		saveToken(tkn,user.id);
		debug('Mongodb:inserted: new user');
		debug(user);
    });	
};
exports.generateToken = function(req,res,next){
	User.findOne({ email: req.body.email }, function (err, user) {
		if (err) { 
			var error = {
	    		message:'Some thing went wrong',
	    		status:500
	    	};
		  	return next(error); 
		  }
		if (!user) { 
			var error = {
	    		message:'Invalid user name or password.',
	    		status:403
	    	};
		  	return next(error);  
		}
		user.verifyPassword(req.body.password, function(err, isMatch) {
			if (err) {
				var error = {
	    			message:'Some thing went wrong',
	    			status:500
	    		};
			 	return next(error);
			  }
			if(!isMatch) {
			 	var error = {
	    					message:'Invalid user name or password.',
	    					status:403
	    		};
			  	return next(error);	  	
			  }
			var tkn = token.uid(20);
		    var success = {
		    	message:'Token generated succesfully',
		    	token:tkn
		    };
			res.json(success);
			saveToken(tkn,user.id);
		});
	});
}
var saveToken = function(tkn,id){
	var key = redisPrefix + tkn;
	debug('Redis:inserted: new token');
	db.set(key,id,function(err,status){  
        if(err){
        	debug('Redis:Error inserting');
          	debug(err);
        }
    });
}