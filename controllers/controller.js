var controller = {
	index: function(req, res) {
		res.render('index', {
			title: 'lingo'
		})
	}
}

module.exports = controller;