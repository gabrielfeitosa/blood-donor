var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = function() {

    var schema = new Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        contactNumber: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        bloodGroup: {
            type: String,
            required: true
        },
        coords: {
            lat: {
                type: Schema.Types.Number,
                required: true
            },
            lon: {
                type: Schema.Types.Number,
                required: true
            }
        },
        address: {
            type: String,
            required: true
        },
        ip: {
            type: String,
            required: true
        }

    });

    return mongoose.model('Donor', schema);
};