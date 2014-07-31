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
		console.log(req.body)
	},
	login: function(req, res) {
		res.render('login', {
			title: 'login'
		})
	}
}

module.exports = controller;