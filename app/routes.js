//require express
const express = require('express');
const path = require('path');

//create router object
//var router= express.Router();

//export our router
//module.exports = router;

module.exports = function(app) {
	app.get('/', function(req, res){
		res.sendFile(path.join(__dirname, '../web/index.html'));
	});
	app.get('/login', function(req, res){
		res.sendFile(path.join(__dirname, '../web/login.html'));
	});
	app.get('/signup', function(req, res){
		res.sendFile(path.join(__dirname, '../web/signup.html'));
	});
};
