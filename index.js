const express = require('express');
const app = express();
const port = 3000;
const http = require('http').Server(app); //dunno what this is
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const configDB = require('./config/database.js');

//for logging
app.use(morgan('dev'));

//for reading cookies (for authentication)
app.use(cookieParser());

//for user input
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//for database connection
mongoose.connect(configDB.url);

//required for passport (authentication)
require('./config/passport')(passport);
app.use(session({
	secret: 'secretKey',
	resave: true,
	saveUninitialized: true
 })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//for hosting
//const http = require('http').Server(app);

//route our app

var router = require('./app/routes')(app);

app.use(express.static(__dirname + '/web'));

// start server
app.listen(port, function(err){
	if(err){
		return console.log('something bad happened', err);
	}
	console.log('Listening on port:' + port);
});

module.exports = app;
