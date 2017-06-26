var mongoose = require("mongoose");

var movieSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	genre:[],
	releasedt:{
		type:Date,
		required:true
	},
	created:{ type: Date, default: new Date()}
});

module.exports = mongoose.model("movies", movieSchema);