//require express
const express = require('express');
const path = require('path');

//create router object
var router= express.Router();

//export our router
module.exports = router;

router.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '../web/index.html'));
});
router.get('/login', function(req, res){
	res.sendFile(path.join(__dirname, '../web/login.html'));
});