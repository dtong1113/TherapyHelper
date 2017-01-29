var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Answer = new Schema({
    response: [String],   //response to the answer
    uuid: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Answer', Answer);
