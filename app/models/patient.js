var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Patient = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    gender: String,
    age: Number,
    address: String,
    illness: String,
    therapistUsername: String,
    uuid: {
        type: String,
        required: true
    },
    templates: [{
        uuid: String,
        isCompleted: Boolean,
        dateAssigned: Date,
        dateCompleted: Date,
        answers: [String]
    }]
});

module.exports = mongoose.model('Patient', Patient);
