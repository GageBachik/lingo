var mongoose = require('mongoose');
var findOneOrCreate = require('mongoose-find-one-or-create');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	fbId: Number,
	stats: Object,
	currentQuiz: Object
});

UserSchema.plugin(findOneOrCreate);

var User = mongoose.model('User', UserSchema);

module.exports = User;