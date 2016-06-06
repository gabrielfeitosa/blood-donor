var express = require('express');
var bodyParser = require('body-parser');
var load = require('express-load');
var config = require('./config/config.db');
var cors = require('cors');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var port = 8081;

require('./config/database')(config.db);
app.use(cors());
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));

app.use(bodyParser.json());

load('models')
    .then('controllers')
    .then('routes')
    .into(app);

io.on('connection', require('./util/socket'));

server.listen(port, function () {
    console.log('Servidor rodando na porta ' + port);
});
