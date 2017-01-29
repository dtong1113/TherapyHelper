var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    type: {
        type: Number,
        required: true
    },
    uuid: {
        type: String,
        required: true
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);