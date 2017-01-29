var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Therapist = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    patients: {
        type: [String]
    },
    uuid: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Therapist', Therapist);
