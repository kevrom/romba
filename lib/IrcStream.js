'use strict';

var Transform = require('stream').Transform;
var util      = require('util');

/**
 * Used to create a new IRC stream utilizing Node's transform stream
 * @constructor
 */
function IrcStream() {
	Transform.call(this);
}
util.inherits(IrcStream, Transform);

IrcStream.prototype._transform = function(chunk, encoding, callback) {
	callback(null, chunk);
};

module.exports = IrcStream;
