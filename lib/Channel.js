'use strict';

var EventEmitter = require('events').EventEmitter;

function Channel() {
	EventEmitter.call(this);
}
util.inherits(Channel, EventEmitter);

module.exports = Channel;
