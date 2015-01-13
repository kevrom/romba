'use strict';

var EventEmitter = require('events').EventEmitter;
var util         = require('util');
var Server       = require('./Server');

function Client(options) {
	this.server = new Server(options);

	EventEmitter.call(this);
}
util.inherits(Client, EventEmitter);

Client.prototype.init = function init() {
	this.server.connect();

	this.server.once('connected', function() {
		this.join('#/r/webdev');
	}.bind(this));
};

Client.prototype.join = function join(channel) {
	this.server._write('JOIN :' + channel);
};

module.exports = Client;
