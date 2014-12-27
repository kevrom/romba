'use strict';

var net = require('net');

/**
 * Creates a socket connection
 * @function
 * @param {number} port The requested port
 * @param {string} host The host to connect to
 * @return {object} Returns the connected socket
 */
function createSocket(port, host, cb) {
	var socket = net.connect(port, host, function() {
		(cb() || Function)();
	});

	return socket;
}

module.exports.createSocket = createSocket;
