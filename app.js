// --------------------------------- server ---------------------------------
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var controller = require('./controllers/controller.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

// ----- mongodb via mongoose
// ---------------------------------------
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:password@ds059908.mongolab.com:59908/lingo');


// ----- set view engine to jade in /views
// ---------------------------------------
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

// ----- static files in /public
// ---------------------------------------
app.use(express.static(__dirname + '/public'));

// ----- parse form body as json
// ---------------------------------------
app.use(bodyParser.urlencoded({extended: false}));

// ----- routes
// ---------------------------------------
app.get('/', function(req, res) {
	res.render('index', {
			title: 'lingo'
		})
	}
);

// ----- create server
// 		--	on port 3000
// 		-- 	unless process has port defined
// ---------------------------------------
var port = Number(process.env.PORT || 3000);
var server = app.listen(port, function() {
	console.log('Server on... localhost:' + server.address().port);
});