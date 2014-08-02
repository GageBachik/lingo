var wordList = ['time', 'person', 'year', 'way', 'day', 'thing', 'man', 'world', 'life', 'hand', 'part', 'child', 'eye', 'woman', 'place', 'work', 'week', 'case', 'point', 'government', 'company', 'number', 'group', 'problem', 'fact', 'be', 'have', 'do', 'say', 'get', 'make', 'go', 'know', 'take', 'see', 'come', 'think', 'look', 'want', 'give', 'use', 'find', 'tell', 'ask', 'work', 'seem', 'feel', 'try', 'leave', 'call', 'good', 'new', 'first', 'last', 'long', 'great', 'little', 'own', 'other', 'old', 'right', 'big', 'high', 'different', 'small', 'large', 'next', 'early', 'young', 'important', 'few', 'public', 'bad', 'same', 'able'];
var Q = require('q');
var mongoose = require('mongoose');
var User = require('../models/users.js');
var BeGlobal = require('node-beglobal');
var beglobal = new BeGlobal.BeglobalAPI({
	api_token: 'oHXJOmw0m6ko6yR6%2BmTImg%3D%3D'
});

var quiz = {
	getTranslation: function(fromLang, toLang, randomWord){
		return Q.ninvoke(beglobal.translations, 'translate', {
			text: randomWord,
			from: fromLang,
			to: toLang
		}).then(function(results){
			console.log("results.translation.toLowerCase():", results.translation.toLowerCase());
			if (results.translation.toLowerCase() === randomWord) {
				// quiz.getQuestion(req,res);
			}else{
				return results.translation.toLowerCase();
			}
		})
	},
	getQuestion: function(req, res){
		var randomWord = wordList[Math.round(Math.random()*(wordList.length-1))];
		console.log('randomWord',randomWord);
		if (req.params.fromLang === 'eng' /*|| req.params.toLang === 'eng'*/) {
			quiz.getTranslation('eng', req.params.toLang, randomWord).then(function(value){
				User.findOneAndUpdate({fbId: req.user.fbId}, {currentQuiz: {answer: value}})
					.exec()
					.then(function(value){
						console.log('Updated User');
				});
				res.send({translation: randomWord});
			}, function(error){
				res.send(error);
			});
		}else{
			var engPromise = quiz.getTranslation('eng', req.params.fromLang, randomWord);
			engPromise.then(function(word){
				console.log('first translation', word);
				User.findOneAndUpdate({fbId: req.user.fbId}, {currentQuiz: {answer: word}})
					.exec()
					.then(function(value){
						console.log('Updated User');
				});
				console.log("word:", word)
				return quiz.getTranslation(req.params.fromLang, req.params.toLang, word);
			}).then(function(word){
				// console.log(req.user);
				res.send({translation: word});
			}, function(error){
				console.log("error:", error);
				res.send(error);
			});
		}
	},
	answer: function(req, res){

	}
}

module.exports = quiz;