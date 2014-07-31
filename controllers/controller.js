var BeGlobal = require('node-beglobal');
var beglobal = new BeGlobal.BeglobalAPI({
	api_token: 'oHXJOmw0m6ko6yR6%2BmTImg%3D%3D'
});


console.log(beglobal);

var controller = {

	index: function(req, res) {
		res.render('index', {
			title: 'lingo'
		})
	},

	progress: function(req, res) {
		res.render('progress', {
			title: 'progress'
		})
	},

	quiz: function(req, res) {
		res.render('quiz', {
			title: 'quiz'
		})
	},

	translator: function(req, res) {
		res.render('translate', {
			title: 'translate'
		})
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
				res.render('translate', {
					title: 'translate',
					// pass translation to jade view
					// so it can be rendered in <h2>
					translation: results.translation
				})
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