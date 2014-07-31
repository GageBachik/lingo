var wordList = ['time', 'person', 'year', 'way', 'day', 'thing', 'man', 'world', 'life', 'hand', 'part', 'child', 'eye', 'woman', 'place', 'work', 'week', 'case', 'point', 'government', 'company', 'number', 'group', 'problem', 'fact', 'be', 'have', 'do', 'say', 'get', 'make', 'go', 'know', 'take', 'see', 'come', 'think', 'look', 'want', 'give', 'use', 'find', 'tell', 'ask', 'work', 'seem', 'feel', 'try', 'leave', 'call', 'good', 'new', 'first', 'last', 'long', 'great', 'little', 'own', 'other', 'old', 'right', 'big', 'high', 'different', 'small', 'large', 'next', 'early', 'young', 'important', 'few', 'public', 'bad', 'same', 'able'];
var Q = require('q');
var deferred = Q.defer();
var BeGlobal = require('node-beglobal');
var beglobal = new BeGlobal.BeglobalAPI({
	api_token: 'oHXJOmw0m6ko6yR6%2BmTImg%3D%3D'
});

var quiz = {
	getQuestion: function(req, res){
		var randomWord = wordList[Math.round(Math.random()*(wordList.length-1))];
		if (req.params.fromLang === 'eng') {
			//translate a word
			beglobal.translations.translate({
				text: randomWord,
				from: req.params.fromLang,
				to: req.params.toLang
			},
			function(err, results) {
				if (err) {
					deferred.reject(new Error(error));
				}
				else {
					deferred.resolve(results.translation);
				}
			});

			deferred.promise.then(function(value){
				console.log("value:", value);
			}, function(error){
				console.log("error:", error);
			});
		}else{

		}
	},
	answer: function(req, res){

	}
}

module.exports = quiz;