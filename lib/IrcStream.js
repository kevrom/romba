'use strict';

var Transform = require('stream').Transform;
var util      = require('util');

function IrcStream() {
	Transform.call(this);
}
util.inherits(IrcStream, Transform);

IrcStream.prototype._transform = function(chunk, encoding, callback) {
	callback(null, chunk);
};

module.exports = IrcStream;
