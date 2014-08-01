var wordList = ['time', 'person', 'year', 'way', 'day', 'thing', 'man', 'world', 'life', 'hand', 'part', 'child', 'eye', 'woman', 'place', 'work', 'week', 'case', 'point', 'government', 'company', 'number', 'group', 'problem', 'fact', 'be', 'have', 'do', 'say', 'get', 'make', 'go', 'know', 'take', 'see', 'come', 'think', 'look', 'want', 'give', 'use', 'find', 'tell', 'ask', 'work', 'seem', 'feel', 'try', 'leave', 'call', 'good', 'new', 'first', 'last', 'long', 'great', 'little', 'own', 'other', 'old', 'right', 'big', 'high', 'different', 'small', 'large', 'next', 'early', 'young', 'important', 'few', 'public', 'bad', 'same', 'able'];
var Q = require('q');
var mongoose = require('mongoose');
var User = require('../models/users.js');
var BeGlobal = require('node-beglobal');
var beglobal = new BeGlobal.BeglobalAPI({
	api_token: 'oHXJOmw0m6ko6yR6%2BmTImg%3D%3D'
});

var quiz = {
	getQuestion: function(req, res){
		var deferred = Q.defer();
		var randomWord = wordList[Math.round(Math.random()*(wordList.length-1))];
		console.log('randomWord',randomWord);
		if (req.params.fromLang === 'eng') {
			//translate a word
			beglobal.translations.translate({
				text: randomWord,
				from: req.params.fromLang,
				to: req.params.toLang
			},
			function(err, results) {
				if (err) {
					deferred.reject(new Error(err));
				}
				else {
					console.log("results.translation.toLowerCase():", results.translation.toLowerCase());
					if (results.translation.toLowerCase() === randomWord) {
						this.getQuestion(req,res);
					}else{
						deferred.resolve(results.translation.toLowerCase());
					}
				}
			});

			deferred.promise.then(function(value){
				User.findOneAndUpdate({fbId: req.User.fbId}, {currentQuiz: {answer: value}},function(err,user){
					console.log("user:", user);
					user.save();
				});
				res.send({translation: randomWord});
			}, function(error){
				res.send(error);
			});
		}else{
			beglobal.translations.translate({
				text: randomWord,
				from: 'eng',
				to: req.params.fromLang
			},
			function(err, results) {
				if (err) {
					deferred.reject(new Error(err));
				}
				else {
					console.log("results.translation.toLowerCase():", results.translation.toLowerCase());
					if (results.translation.toLowerCase() === randomWord) {
						this.getQuestion(req,res);
					}else{
						deferred.resolve(results.translation.toLowerCase());
					}
				}
			});

			deferred.promise.then(function(value){
				beglobal.translations.translate({
					text: value,
					from: req.params.fromLang,
					to: req.params.toLang
				},
				function(err, results) {
					if (err) {
						res.send('error');
					}
					else {
						User.findOneAndUpdate({fbId: req.User.fbId}, {currentQuiz: {answer: value}},function(err,user){
							user.save();
						});
						res.send({translation: randomWord});
					}
				});
			}, function(error){
				console.log("error:", error);
			});
		}
	},
	answer: function(req, res){

	}
}

module.exports = quiz;