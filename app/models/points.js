var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Points = new Schema({
    lastLogin: Date,
    totalPoints: Number,
    streak : Number
});

module.exports = mongoose.model('Points', Points);
