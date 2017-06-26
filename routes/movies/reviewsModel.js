var mongoose = require("mongoose");
var reviewsSchema = new mongoose.Schema({
	created:{ type: Date, default: new Date()},
	comment:String,
	rating:Number,
	user:{
		type: mongoose.Schema.Types.ObjectId,
        ref: "users"
	},
	movie:{
		type: mongoose.Schema.Types.ObjectId,
        ref: "movies"
	}
});

module.exports = mongoose.model("reviews", reviewsSchema);