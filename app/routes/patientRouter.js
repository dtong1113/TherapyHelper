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

router.post('/data', Verify.verifyPatient, function (req, res) {
	var name = req.body.name || "";
	var gender = req.body.gender || "";
	var age = req.body.age || "";
	var address = req.body.address || "";
	var illness = req.body.illness || "";
	Patient.find({
		username: req.session.username
	}, function (err, patient) {
		if (err)
			return res.status(500).json({err: err});
		patient.name = name;
		patient.gender = gender;
		patient.age = age;
		patient.address = address;
		patient.illness = illness;

		patient.save(function (err, patient) {
			if (err)
				return res.status(500).json({err: err});
			return res.status(200).json({status: "add-data-success"});
		});
	});
});	

router.get('/templates', Verify.verifyPatient, function (req, res) {
	Patient.find({
		username: req.session.username
	}, function (err, patient) {
		if (err)
			return res.status(500).json({err: err});
		var uuids = [];
		for (var i = 0; i < patient.templates.length; i++)
			uuids.push(patient.templates[i].uuid);
		Template.find({uuid: {"$in", uuids}}, function (err, templates) {
			if (err)
				return res.status(500).json({err: err});
			return res.status(200).json({data: templates});	
		});
	});
});

router.post('/templates', Verify.verifyPatient, function (req, res) {
	var templateUuid = req.body.uuid;
	var answers = req.body.answers;
	Patient.find({
		username: req.session.username
	}, function (err, patient) {
		if (err)
			return res.status(500).json({err: err});
		for (var i = 0; i < patient.templates.length; i++)
			if (patient.templates[i].uuid == templateUuid)
				patient.templates[i].answers = answers;
		patient.save(function (err, patient) {
			if (err)
				return res.status(500).json({err: err});
			return res.status(200).json({status: "add-answers-success"});
		});
	});
});

module.exports = router;