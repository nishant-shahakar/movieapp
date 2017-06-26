var Movies = require('./moviesModel.js');
var Reviews = require('./reviewsModel.js');

exports.get = function(req,res,next) {
	var q = Movies.find({}).limit(20);
	q.exec(function(err,movies){
		if(err){
			var error = {
	    		message:'Some thing went wrong',
	    		status:500
	    	};
			return next(error);
		}
		var success = {
	    	movies:movies
	    };
	    res.json(success);
	});
}
exports.addMovies = function(req,res,next){
	if(!validatedMovie(req.body)){
		var error = {
	    		message:'name & releasedt is required',
	    		status:400
	    };
	    next(error);
		return;
	}
	var movie = new Movies({
		name:req.body.name,
		releasedt:new Date(req.body.releasedt),
		genre:req.body.genre
	});
	movie.save(function(err,newMovie) {
		if(err){
			var error = {
	    		message:'Some thing went wrong',
	    		status:500
	    	};
	    	return next(error);
		}
		var success = {
	    	message:'Movie added succesfully',
	    	movie:movie
	    };
		res.json(success);
	});
}

exports.rateMovies = function(req,res,next){
	var userId= req.userId;
	var movieId = req.params.id;
	if(!req.body.rating || !req.body.review){
		var error = {
	    		message:'Rating & review is required',
	    		status:400
	    	};
	    return next(error);
	}
	var rating = req.body.rating < 0 ? 0 : req.body.rating > 5 ? 5 :  req.body.rating;
	Movies.count({_id: movieId}, function (err, count){ 
		if(err){
			var error = {
	    		message:'bad request or Invalid movie Id',
	    		status:400
	    	};
	    	return next(error);
		}
	    if(count < 1){
	    	var error = {
	    		message:'Invalid movie Id',
	    		status:400
	    	};
	    	return next(error);
	    }
	    Reviews.count({movie:movieId,user:userId},function(err,count){
	    	if(count > 0 ){
	    		var success = {
	    			message:'Your already rated this movie.'
	    		};	
	    		return res.json(success);
	    	}
	    	review = new Reviews({
	    		comment:req.body.review,
				rating:rating,
				movie:movieId,
				user:userId
			});
			review.save(function(){
				if(err){
					var error = {
			    		message:'Some thing went wrong.',
			    		status:500
			    	};
			    	return next(error);
				}
				var success ={
					message:'Thanks for rating!'
				}
				res.json(success);
			});
	    });
	}); 
}
exports.topRated = function(req,res,next){
	Reviews.aggregate([
		    { "$unwind": "$movie" },
		    {
		        "$lookup": {
		            "from": "movies",
		            "localField": "movie",
		            "foreignField": "_id",
		            "as": "resultingArray"
		        }
		    },
		    {
		        "$group": {
		            "_id":"$movie",
		            "averageRating": { "$avg":"$rating" },
		            "movieName":{"$first":"$resultingArray.name"}
		        }
		    },{
		    	"$sort": {
		    		"averageRating": -1
		    	}
		    },{ 
		    	"$limit":20
		    }
		 ])
		.exec(function(err,movies){
			if(err){
					var error = {
		    		message:'Some thing went wrong',
		    		status:500
		    	};
				return next(error);
			}
			var success = {
				movies:movies
			}
			res.json(success);
		});
}
var validatedMovie = function(movie){
	if(!movie.name){
		return false;
	}
	if(!movie.releasedt){
		return false;
	}
	return true;
}

// .unwind('$movie')
// 		.group({
// 			"_id": "$movie",
// 			"averageRating":{
// 				"$avg": "$rating"
// 			},
// 			"comments":{
// 				'$push':{
// 					"comment":"$comment",
// 					"userId":"$user"
// 				}
// 			}
// 		})
// 		.sort({'averageRating': -1})
// 		.limit(20)