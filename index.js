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
const userRouter = require('./app/routes/userRouter.js');
const therapistRouter = require('./app/routes/therapistRouter.js');
const cookieSession = require('cookie-session');
const uuid = require('uuid/v1');

//for logging
app.use(morgan('dev'));

//for reading cookies (for authentication)
app.use(cookieParser());
app.use(cookieSession({
	name: 'session',
	maxAge: 3600000,
	keys: ['0', '1', '2']
}));

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
app.use('/therapist', therapistRouter);

// start server
app.listen(port, function(err){
	if (err)
		return console.log('something bad happened', err);
	console.log('Listening on port:' + port);
});

module.exports = app;
