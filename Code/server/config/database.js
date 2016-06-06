var mongoose = require('mongoose');

module.exports = function(db) {
    
    mongoose.connect(db.url);
    mongoose.set('debug', db.debug);

    mongoose.connection.on('connected', function(){
       console.log('Mongoose conectado em '+db.url); 
    });
    
    mongoose.connection.on('disconnected', function(){
       console.log('Mongoose desconectado de '+db.url); 
    });
    
    mongoose.connection.on('error', function(erro){
       console.log('Mongoose erro na conexão: '+erro); 
    });
    
    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log('Mongoose desconectado pelo término da aplicação');
            process.exit(0);
        })
    })
}