var express = require('express');
var router = express.Router();
var Patient = require('../models/patient');
var Therapist = require('../models/therapist');
var User = require('../models/user');
var Verify = require('./verify');

router.get('/username', Verify.verifyTherapist, function (req, res) {
	res.send(req.session.username);
});

router.get('/patients', Verify.verifyTherapist, function (req, res) {
	Patient.find({
		username: req.session.username
	}, function (err, patients) {
		if (err)
			res.send(err);
		var ret = {data: []};
		for (var i = 0; i < patients.length; i++)
			ret.data.push(patients[i]);
		res.send(ret);
	});
});	

router.post('/post', Verify.verifyTherapist, function (req, res) {

});

module.exports = router;