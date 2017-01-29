var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Template = new Schema({
    questions: [String],   //question
    answerTypes: [String],   //type of answer for each question
    uuid: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Template', Template);
