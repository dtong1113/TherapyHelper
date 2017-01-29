var express = require('express');
var router = express.Router();
var passport = require('passport');
var Patient = require('../models/patient');
var Therapist = require('../models/therapist');
var User = require('../models/user');
var Verify = require('./verify');
const uuid = require('uuid/v1');

// post request for registering a user
router.post('/register', function (req, res) {
    var username = req.body.username;
    var type = req.body.type;
    User.register(new User({username: username, type: type, uuid: uuid()}), req.body.password, function (err, user) {
        if (err)
            return res.status(500).json({err: err});
        
        passport.authenticate('local')(req, res, function () {
            if (type == 1) {
                var patient = new Patient({
                    username: username,
                    uuid: uuid(),
                    templates: []
                });
                patient.save(function (err, patient) {
                    if (err)
                        return res.status(500).json({err: err});
                    return res.status(200).json({status: 'registration-success'});
                });
            } else {
                var therapist = new Therapist({
                    username: username,
                    uuid: uuid()
                });
                therapist.save(function (err, therapist) {
                    if (err)
                        return res.status(500).json({err: err});
                    return res.status(200).json({status: 'registration-success'});
                });
            }
        });
    });
});

// post request for authenticating a user
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err)
            return next(err);
        
        if (!user)
            return res.status(401).json({err: info});
        req.logIn(user, function (err) {
            if (err)
                res.status(500).json({err: 'Could not log in user'});
            
            console.log('User in users: ', user);
            
            var token = Verify.getToken(user);
            req.session.token = token;
            req.session.type = user.type;
            req.session.username = user.username;
            res.status(200).json({
                type: user.type,
                username: user.username,
                status: 'login-success',
                success: true,
                token: token
            });
        });
        
    })(req, res, next);
});

// get request for logging out a user
router.get('/logout', function (req, res) {
    req.session.token = null;
    req.session.type = null;
    req.logout();
    res.status(200).json({status: 'Successfully logged out'});
});

module.exports = router;