var EVENT_EMITTER = require(__dirname + '/../events.js');

var GlobalEventEmitter = EVENT_EMITTER.getEventEmitter();

module.exports = function(app) {

    var donor = {};

    var Donor = app.models.donorModel;

    donor.find = function(req, res) {
        var query = {};
        if (req.query.length) {
            query = {
                $and: [{
                    "coords.lat": {
                        $gt: req.query.ymin,
                        $lt: req.query.ymax
                    }
                }, {
                    "coords.lon": {
                        $gt: req.query.xmin,
                        $lt: req.query.xmax
                    }
                }, ]
            };
        }
        
        Donor.find(query).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            console.error('donor.find ' + err);
            res.status(500).send(err);

        });
    }

    donor.findById = function(req, res) {
        Donor.findById(req.params.id)
            .then(function(data) {
                if (!data) {
                    return res.status(404).send();
                }
                res.json(data);
            }).catch(function(err) {
                console.log('hero.findById ' + err);
                res.status(500).send(err);
            });
    }

    donor.create = function(req, res) {
        req.body.ip = req.ip;
        Donor.create(req.body)
            .then(function(data) {
                GlobalEventEmitter.emit('donorCreated', data);
                res.json(data);
            }).catch(function(err) {
                console.error('donor.create ' + err);
                res.status(500).send(err);
            });
    };
    
    donor.update = function (req, res) {

        Donor.findByIdAndUpdate(req.params.id, req.body)
            .then(function (donor) {
                GlobalEventEmitter.emit('donorUpdated', donor);
                res.json(donor);
            }).catch(function (err) {
                console.log('donor.update '+err);
                res.status(500).send(err);
            });
    }

    donor.remove = function(req, res) {
        Donor.findByIdAndRemove(req.params.id)
            .then(function(data) {
                GlobalEventEmitter.emit('donorDeleted', data);
                res.json(data);
            })
            .catch(function(err) {
                console.log('hero.delete ' + err);
                res.status(500).send(err);
            });
    }

    return donor;
}