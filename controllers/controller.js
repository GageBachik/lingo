var BeGlobal = require('node-beglobal');
var beglobal = new BeGlobal.BeglobalAPI({
	api_token: 'oHXJOmw0m6ko6yR6%2BmTImg%3D%3D'
});

var controller = {

	index: function(req, res) {
		// call req.user to get all user info at any time! O.o
		// console.log('login info',req, req.user);
		// check for login
		if (req.user) {
			res.render('index', {
				title: 'lingo'
			});
		}
		else {
			res.redirect('/login');
		}
		
	},

	progress: function(req, res) {
		if (req.user) {
			console.log(req.user);
			res.render('progress', {
				title: 'progress',
				stats: req.user.stats
			})
		}
		else {
			res.redirect('/login');
		}
	},

	quiz: function(req, res) {
		if (req.user) {
			res.render('quiz', {
				title: 'quiz'
			})
		}
		else {
			res.redirect('/login');
		}
	},

	newQuiz: function(req, res) {
		res.redirect('/quiz');
	},

	startQuiz: function(req, res) {
		if (req.user) {
			res.render('start-quiz', {
				title: 'new quiz'
			})
		}
		else {
			res.redirect('/login');
		}
	},

	translator: function(req, res) {
		if (req.user) {
			res.render('translate', {
				title: 'translate'
			})
		}
		else {
			res.redirect('/login');
		}
	},

	translate: function(req, res) {

		// beglobal requires `text`, `from`, and `to`
		// ... our form provides those values
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

	login: function(req, res) {
		res.render('login', {
			title: 'login'
		})
	}

}

module.exports = controller;