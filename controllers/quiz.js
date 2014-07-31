var wordList = ['time', 'person', 'year', 'way,' 'day', 'thing', 'man', 'world', 'life', 'hand', 'part', 'child', 'eye', 'woman', 'place', 'work', 'week', 'case', 'point', 'government', 'company', 'number', 'group', 'problem', 'fact', 'be', 'have', 'do', 'say', 'get', 'make', 'go', 'know', 'take', 'see', 'come', 'think', 'look', 'want', 'give', 'use', 'find', 'tell', 'ask', 'work', 'seem', 'feel', 'try', 'leave', 'call', 'good', 'new', 'first', 'last', 'long', 'great', 'little', 'own', 'other', 'old', 'right', 'big', 'high', 'different', 'small', 'large', 'next', 'early', 'young', 'important', 'few', 'public', 'bad', 'same', 'able'];
var BeGlobal = require('node-beglobal');
var beglobal = new BeGlobal.BeglobalAPI({
	api_token: 'oHXJOmw0m6ko6yR6%2BmTImg%3D%3D'
});

var quiz = {
	getQuestion: function(req, res){
		console.log(req.body);
		//translate a word
		beglobal.translations.translate({
			text: req.body.text,
			from: req.body.from,
			to: req.body.to
		},
		function(err, results) {
			if (err) {
				return console.log(err)
			}
			else {
				res.send({ translation: results.translation });
			}
		});
	},
	answer: function(req, res){

	}
}

module.exports = quiz;