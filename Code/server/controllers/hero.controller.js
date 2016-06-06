module.exports = function (app) {

    var hero = {};

    var Hero = app.models.heroModel;

    hero.create = function (req, res) {

        Hero.create(req.body)
            .then(function (data) {
                res.json(data);
            }).catch(function (err) {
                console.error('hero.create ' + err);
                res.status(500).send(err);
            });
    };

    hero.find = function (req, res) {
        Hero.find(req.query).then(function (data) {
                res.json(data);
            }).catch(function (err) {
                console.error('hero.find ' + err);
                res.status(500).send(err);

            });
    }

    hero.findById = function (req, res) {
        Hero.findById(req.params.id)
            .then(function(data) {
                if(!data){
                    return res.status(404).send();
                }
                res.json(data);
            }).catch(function(err){
                console.log('hero.findById '+err);
                res.status(500).send(err);
            });
    }

    hero.update = function (req, res) {

        Hero.findByIdAndUpdate(req.params.id, req.body)
            .then(function (hero) {
                res.json(hero);
            }).catch(function (err) {
                console.log('hero.update '+err);
                res.status(500).send(err);
            });
    }

    hero.remove = function (req, res) {

        Hero.remove({ _id: req.params.id })
            .then(function (data) {
                res.json(data);
            })
            .catch(function (err) {
                console.log('hero.delete '+err);
                res.status(500).send(err);
            });
    }

    return hero;
}