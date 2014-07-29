// --------------------------------- server ---------------------------------
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var controller = require('./controllers/controller.js');

// auth setup
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: '332743610214109',
    clientSecret: 'cbcdc673a23db1baff5c117ebafb6404',
    callbackURL: "http://lingo-refactoru.herokuapp.com/auth/facebook/authed"
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log(profile, done);
  	// create a user here or log them in
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
  }
));
// end auth setup
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
app.get('/', controller.index);
app.get('/login', controller.login);
app.get('/quiz', controller.quiz);
app.get('/translate', controller.translate);
app.get('/progress', controller.progress);

// authentication
	// Redirect the user to Facebook for authentication.  When complete,
	// Facebook will redirect the user back to the application at
	//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

	// Facebook will redirect the user to this URL after approval.  Finish the
	// authentication process by attempting to obtain an access token.  If
	// access was granted, the user will be logged in.  Otherwise,
	// authentication has failed.
	app.get('/auth/facebook/authed', passport.authenticate('facebook', { 
		successRedirect: '/',
		failureRedirect: '/login' 
	}));
// authentication


// ----- create server
// 		--	on port 3000
// 		-- 	unless process has port defined
// ---------------------------------------
var port = Number(process.env.PORT || 3000);
var server = app.listen(port, function() {
	console.log('Server on... localhost:' + server.address().port);
});