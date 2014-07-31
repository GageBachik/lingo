var mongoose = require('mongoose');
var findOneOrCreate = require('mongoose-find-one-or-create');
var Schema = mongoose.Schema;

// changed from:
// var UserSchema = mongoose.Schema({
// if this broke it, put ^ back
var UserSchema = new Schema({
	name: String,
	fbId: Number,
	stats: Object
});

UserSchema.plugin(findOneOrCreate);

var User = mongoose.model('User', UserSchema);

module.exports = User;