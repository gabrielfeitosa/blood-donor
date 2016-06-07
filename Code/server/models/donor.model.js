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
            required: true,
            validate: {
                validator: function(v) {
                    return /^(\+|00)[0-9]{2} [0-9]{3} [0-9]{4} [0-9]{3}/.test(v);
                }
            }
        },
        email: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(v);
                }
            }
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