const express = require('express');
const app = express();
const port = 3000;
const http = require('http').Server(app);
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const config = require('./config.js');
const LocalStrategy = require('passport-local').Strategy;
const userRouter = require('./app/routes/users.js');

//for logging
app.use(morgan('dev'));

//for reading cookies (for authentication)
app.use(cookieParser());
app.use(express.cookieSession({
	cookie: {
		path: '/',
		maxAge: 3600000
	}
});

//for user input
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//for database connection
mongoose.connect(config.DB_URL);

// passport config
var User = require('./app/models/user');
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(express.static(__dirname + '/web'));
app.use('/users', userRouter);

// start server
app.listen(port, function(err){
	if (err)
		return console.log('something bad happened', err);
	console.log('Listening on port:' + port);
});

module.exports = app;
