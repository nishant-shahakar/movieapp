var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var UserSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true
  },
  email : {
    type: String,
    unique:true,
    required: true
  },
  genre:[],
  created:{ type: Date, default: new Date() }
});

UserSchema.pre('save', function(callback) {
  var user = this;

  if (!user.isModified('password')) return callback();

  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});
UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('users', UserSchema);