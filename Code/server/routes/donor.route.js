module.exports = function(app) {
    
    var controller = app.controllers.donorController;
    var url = '/api/donor';
    app.get(url, controller.find);
    app.get(url+'/:id', controller.findById);
    app.post(url, controller.create);
    app.put(url+'/:id', controller.update);
    app.delete(url+'/:id', controller.remove);
    app.delete(url, controller.clean);
};