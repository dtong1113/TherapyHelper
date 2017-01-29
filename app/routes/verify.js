var User = require('../models/user');
var jwt = require('jsonwebtoken');

var config = require('../../config.js');

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};

exports.verifyTherapist = function (req, res, next) {
    var token = req.session.token || req.body.token || req.query.token || req.headers['x-access-token'];
    var type = req.session.type;
    
    if (token) {
        // if there is a token, then verify using jwt
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else if (type != 0) {
                var err = new Error('You do not have the permissions!');
                err.status = 401;
                return next(err);
            } else {
                next();
            }
        });
    } else {
        // no token
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};

exports.verifyPatient = function (req, res, next) {
    var token = req.session.token || req.body.token || req.query.token || req.headers['x-access-token'];
    var type = req.session.type;
    
    if (token) {
        // if there is a token, then verify using jwt
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else if (type != 1) {
                var err = new Error('You do not have the permissions!');
                err.status = 401;
                return next(err);
            } else {
                next();
            }
        });
    } else {
        // no token
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};