var User = require('./userModel.js');
var db = require('./../../utils/redisClient.js').db;

exports.get = function(req, res,next) {
	res.send('Get User');
};
exports.register = function(req,res,next) {
	var user = new User({
		email:req.body.email,
		password:req.body.password
	});
	user.save(function(err,newUser) {
	    if (err){
	    	var error = {
	    		message:'Bad request',
	    		status:400
	    	};
	    	return next(error);
	    }
	    var success = {
	    	message:'User added succesfully',
	    	token:'abc'
	    };
		res.json(success);
    });	
};