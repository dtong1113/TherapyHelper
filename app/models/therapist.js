var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Therapist = new Schema({
    name: {
        type: String,
        required: true
    },
    patients: {
        type: [String]
    }
    uuid: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Therapist', Therapist);
