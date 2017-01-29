var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Template = new Schema({
    question: [String],   //question
    answerType: [String],   //type of answer for each question
    uuid: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Template', Template);
