module.exports = function(app) {
    
    var controller = app.controllers.heroController;
    var url = '/api/hero';
    app.get(url+'/:id', controller.findById);
    app.get(url, controller.find);
    app.post(url, controller.create);
    app.put(url+'/:id', controller.update);
    app.delete(url+'/:id', controller.remove);
};