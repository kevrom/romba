'use strict';

var net = require('net');

function createSocket(port, host, cb) {
	var socket = net.connect(port, host, function() {
		(cb() || Function)();
	});

	return socket;
}

module.exports.createSocket = createSocket;
