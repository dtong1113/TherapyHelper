var express = require('express');
var router = express.Router();
var Patient = require('../models/patient');
var Therapist = require('../models/therapist');
var Template = require('../models/template');
var User = require('../models/user');
var Verify = require('./verify');
const uuid = require('uuid/v1');

router.get('/username', Verify.verifyTherapist, function (req, res) {
	res.send(req.session.username);
});

// works
router.get('/patients', Verify.verifyTherapist, function (req, res) {
	Patient.find({
		therapistUsername: req.session.username
	}, function (err, patients) {
		if (err)
			return res.status(500).json({err: err});
		var ret = {data: []};
		for (var i = 0; i < patients.length; i++)
			ret.data.push(patients[i]);
        return res.status(200).json(ret);
	});
});	

// works
router.post('/templates', Verify.verifyTherapist, function (req, res) {
	var questions = req.body.questions;
	var answerTypes = req.body.answerTypes;
	var template = new Template({
		questions: questions,
		answerTypes: answerTypes,
		uuid: uuid()
	})

	template.save(function (err, template) {
		if (err)
			return res.status(500).json({err: err});
		return res.status(200).json({status: 'template-saved'});
	});
});

// works
router.get('/templates', Verify.verifyTherapist, function (req, res) {
	Template.find({}, function (err, templates) {
		if (err)
			return res.status(500).json({err: err});
		return res.status(200).json({data: templates});
	});
});

// works
router.post('/user/templates', Verify.verifyTherapist, function (req, res) {
	var patientUsername = req.body.patientUsername;
	var templateUuid = req.body.templateUuid;

	Patient.findOne({
		username: patientUsername
	}, function (err, patient) {
		if (err)
			return res.status(500).json({err: err});
		patient.templates.push({
			uuid: templateUuid,
			isCompleted: false,
			dateAssigned: new Date(),
			dateCompleted: new Date(),
			answers: []
		});
		patient.save(function (err, patient) {
			if (err)
				return res.status(500).json({err: err});
			return res.status(200).json({status: 'add-user-template-success'});
		});
	})
});

module.exports = router;