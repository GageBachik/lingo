var mongoose = require('mongoose');
var findOneOrCreate = require('mongoose-find-one-or-create');

var UserSchema = mongoose.Schema({
	name: String,
	fbId: Number,
	stats: Object
});
UserSchema.plugin(findOneOrCreate);


var User = mongoose.model('User', UserSchema);

module.exports = User;