var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

module.exports = function() {

    var schema = new Schema({
        firstName: {
            type: String
        },
        lastName: {
            type: String,
            required: true
        },
        contactNumber: {
            type: String
        },
        email: {
            type: String
        },
        bloodGroup: {
            type: String
        },
        ip: {
            type: String
        },
        coords: {
            lat: {
                type: Schema.Types.Number
            },
            lon: {
                type: Schema.Types.Number
            }

        }
    });

    return mongoose.model('Donor', schema);
};