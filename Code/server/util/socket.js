var EVENT_EMITTER       = require(__dirname + '/../events.js');

var GlobalEventEmitter = EVENT_EMITTER.getEventEmitter();

// export function for listening to the socket
module.exports = function(socket) {
	console.log('Connected');	  

	socket.on('test', function(msg){
		console.log('message: ' + msg);
		socket.emit('reply', 'got your message:' + msg);
	});

	socket.on('disconnect', function () {
		console.log('Disconnected');
	});

	GlobalEventEmitter.on('donorCreated', function(data) {
		socket.emit('donorCreated', data);
	});

	GlobalEventEmitter.on('donorDeleted', function(data) {
		socket.emit('donorDeleted', data);
	});

	GlobalEventEmitter.on('donorUpdated', function(data) {
		socket.emit('donorUpdated', data);
	});
};


