'use strict';

var Transform = require('stream').Transform;
var util      = require('util');

/**
 * Used to create a new IRC stream utilizing Node's transform stream
 * @constructor
 */
function IrcStream(options) {
	options = options || {};
	options.objectMode = true;
	Transform.call(this, options);
}
util.inherits(IrcStream, Transform);

IrcStream.prototype._transform = function(chunk, encoding, callback) {
	var string = chunk.toString();
	var chunkObj = {};
	if (string.charAt(0) === ':') {
		
	}
	callback(null, chunk);
};

module.exports = IrcStream;
