var express = require('express');
var router = express.Router();
var Patient = require('../models/patient');
var Therapist = require('../models/therapist');
var Template = require('../models/template');
var User = require('../models/user');
var Verify = require('./verify');
const uuid = require('uuid/v1');

router.get('/username', Verify.verifyPatient, function (req, res) {
	res.send(req.session.username);
});

// posts data for patient
router.post('/data', Verify.verifyPatient, function (req, res) {
	var name = req.body.name || "";
	var gender = req.body.gender || "";
	var age = req.body.age || "";
	var address = req.body.address || "";
	var illness = req.body.illness || "";
	var therapistUsername = req.body.therapistUsername || "";
	Patient.findOne({
		username: req.session.username
	}, function (err, patient) {
		if (err)
			return res.status(500).json({err: err});
		patient.name = name;
		patient.gender = gender;
		patient.age = age;
		patient.address = address;
		patient.illness = illness;
		patient.therapistUsername = therapistUsername;

		patient.save(function (err, patient) {
			if (err)
				return res.status(500).json({err: err});
			return res.status(200).json({status: "add-data-success"});
		});
	});
});	

// associates therapist with patient
router.post('/therapist', Verify.verifyPatient, function (req, res) {
	var therapistUsername = req.body.username;
	var patientUsername = req.session.username;
	Patient.update({
		username: req.session.username
	}, {
		therapistUsername: therapistUsername
	}, function (err, num, response) {
		if (err)
			return res.status(500).json({err: err});	
		Therapist.findOne({
			username: therapistUsername
		}, function (err, therapist) {
			console.log(therapist);
			if (err)
				return res.status(500).json({err: err});
			therapist.patients.push(patientUsername);
			therapist.save(function (err, therapist) {
				if (err)
					return res.status(500).json({err: err});
				return res.status(200).json({status: "add-therapist-success"});
			});
		});
	});
});

// gets all Template schema templates to complete for user
router.get('/templates', Verify.verifyPatient, function (req, res) {
	Patient.findOne({
		username: req.session.username
	}, function (err, patient) {
		if (err)
			return res.status(500).json({err: err});
		var uuids = [];
		for (var i = 0; i < patient.templates.length; i++)
			uuids.push(patient.templates[i].uuid);
		Template.find({uuid: {"$in": uuids}}, function (err, templates) {
			if (err)
				return res.status(500).json({err: err});
			return res.status(200).json({data: templates});	
		});
	});
});

// posts answers to template
// INPUTS
//  - uuid of Template schema template
//  - list of answers
router.post('/templates', Verify.verifyPatient, function (req, res) {
	var templateUuid = req.body.uuid;
	var answers = req.body.answers;
	Patient.findOne({
		username: req.session.username
	}, function (err, patient) {
		if (err)
			return res.status(500).json({err: err});
		for (var i = 0; i < patient.templates.length; i++)
			if (patient.templates[i].uuid == templateUuid) {
				patient.templates[i].answers = answers;
				patient.templates[i].isCompleted = true;
				patient.templates[i].dateCompleted = new Date();
			}
		patient.save(function (err, patient) {
			if (err)
				return res.status(500).json({err: err});
			return res.status(200).json({status: "add-answers-success"});
		});
	});
});

module.exports = router;