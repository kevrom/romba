'use strict';

var EventEmitter = require('events').EventEmitter;

function Client() {
	EventEmitter.call(this);
}
util.inherits(Client, EventEmitter);

module.exports = Client;
