var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = function() {

    var schema = new Schema({
        name: {
            type: String,
            required: true
        }
    });

    return mongoose.model('Hero', schema);
};