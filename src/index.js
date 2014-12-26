var net = require('net');
var util = require('util');
var stream = require('stream');
var EventEmitter = require('events').EventEmitter;

var serverSettings = {
	port: 6667,
	host: 'irc.freenode.net'
}
var userSettings = {
	nick: 'romba',
	name: 'Bob Dole',
	channels: [
		'#/r/webdev'
	]
}

function Server(options) {
	this.options = options;
	this.socket = null;
	this.stream = new stream.Duplex();
}
util.inherits(Server, EventEmitter);

Server.prototype.connect = function connect() {
	var opts     = this.options;
	var port     = opts.server.port;
	var host     = opts.server.host;
	var nick     = opts.user.nick;
	var username = opts.user.nick;
	var realname = opts.user.realname;

	this.socket = createSocket(port, host, function() {
		console.log('Now connected to %s:%d', host, port);
		this._write('NICK %s', nick);
		this._write('USER %s 8 * :%s', username, realname);
	});

	this.socket.pipe(this.stream);
};

Server.prototype._write = function _write(data) {
	var string = util.format.apply(this, arguments);
	this.stream.write(string + '\r\n');
};

Server.prototype._parse = function _parse(string) {
	// get the prefix if it exists
	console.log(string.charAt(0));
};

server.on('end', function() {
	console.log('connection ended');
});

server.on('data', function(data){
	_parse(data.toString());
});

function createSocket(port, host, cb) {
	var socket = net.connect(port, host, function() {
		(cb() || Function)();
	});

	return socket;
}
