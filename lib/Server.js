'use strict';

var EventEmitter = require('events').EventEmitter;
var util         = require('util');
var lstream      = require('lstream');
var createSocket = require('./socket').createSocket;
var IrcStream    = require('./IrcStream');

/**
 * A constructor for creating an IRC server connection
 * @constructor
 * @property {object} options Collection of options for the server
 * @property {number} options.server.port Port of the IRC server
 * @property {string} options.server.host The hostname for the IRC server
 * @property {string} options.user.nick Nickname for the IRC bot
 * @property {string} options.user.realname Real name for the bot
 */
function Server(options) {
	this.options = options;
	this.socket = null;
	this.stream = new IrcStream();

	this.stream.on('data', function(message) {
		this._handleMessage(message);
	}.bind(this));

	EventEmitter.call(this);
}
util.inherits(Server, EventEmitter);

/**
 * A method for connecting to an IRC server
 * @method
 */
Server.prototype.connect = function connect(cb) {
	var opts     = this.options;
	var port     = opts.server.port;
	var host     = opts.server.host;
	var nick     = opts.user.nick;
	var username = opts.user.nick;
	var realname = opts.user.realname;

	this.socket = createSocket(port, host, function() {
		util.format('Now connected to %s:%d', host, port);
		this._write('NICK %s', nick);
		this._write('USER %s 8 * :%s', username, realname);
	}.bind(this));

	this.socket.pipe(lstream()).pipe(this.stream);

	if (typeof cb === 'function') {
		cb(this);
	}
};

/**
 * A method for writing to the open socket
 * @method
 */
Server.prototype._write = function _write(data) {
	var string = util.format.apply(this, arguments);
	this.socket.write(string + '\r\n');
	console.log('SEND: ' + string);
};

Server.prototype._handleMessage = function _handleMessage(message) {
	var self = this;

	var handlers = {
		'PING': function() {
			self._write('PONG :' + message.params[0]);
		},
		'PRIVMSG': function() {
			self._handlePrivmsg(message.prefix, message.params);
			self.emit('privmsg');
		},
		'376': function() { // end of MOTD
			self.emit('connected');
		}
	}

	if (handlers[message.command]) {
		handlers[message.command]();
	}
};

Server.prototype._handlePrivmsg = function _handlePrivmsg(prefix, params) {
	if (prefix.indexOf('!')) {
		var nick = prefix.split('!', 1);
		//console.log(nick);
	}
};

module.exports = Server;
