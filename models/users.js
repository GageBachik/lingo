var mongoose = require('mongoose');

var User = mongoose.model('User', {
	name: String,
	fbId: Number,
	stats: Object
})

module.exports = User;