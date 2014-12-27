'use strict';

var EventEmitter = require('events').EventEmitter;
var util         = require('util');
var createSocket = require('./socket').createSocket;
var IrcStream    = require('./IrcStream');

function Server(options) {
	this.options = options;
	this.socket = null;
	this.stream = new IrcStream();

	this.stream.on('data', function(chunk) {
		console.log(chunk.toString());
	});
}
util.inherits(Server, EventEmitter);

Server.prototype.connect = function connect() {
	var opts     = this.options;
	var port     = opts.server.port;
	var host     = opts.server.host;
	var nick     = opts.user.nick;
	var username = opts.user.nick;
	var realname = opts.user.realname;

	var self = this;

	this.socket = createSocket(port, host, function() {
		console.log('Now connected to %s:%d', host, port);
		self.write('NICK %s', nick);
		self.write('USER %s 8 * :%s', username, realname);
	});

	this.socket.pipe(this.stream);
};

Server.prototype.write = function write(data) {
	var string = util.format.apply(this, arguments);
	this.socket.write(string + '\r\n');
};

Server.prototype._parse = function _parse(string) {
	// get the prefix if it exists
	console.log(string.charAt(0));
};

module.exports = Server;
