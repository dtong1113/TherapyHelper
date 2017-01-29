var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Patient = new Schema({
    name: String,
    gender: String,
    age: Number,
    address: String,
    illness: String,
    therapistID: String
    uuid: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Patient', Patient);
