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

IrcStream.prototype._transform = function _transform(chunk, encoding, callback) {
	var message = chunk.toString();
	message = this._parse(message);
	callback(null, message);
};

/**
 * Parses incoming messages
 * @param {string} message Incoming IRC message
 * @return {object} Object containing prefix, command, and any parameters
 */
IrcStream.prototype._parse = function _parse(message) {
	var chunkObj = {};
    chunkObj.prefix = '';
    chunkObj.command = null;
    chunkObj.params = [];

    var prefixEnd = -1;
    var trailingStart = message.length;
    var trailing, commandAndParams;
	if (message.charAt(0) === ':') {
      prefixEnd = message.indexOf(' ');
      chunkObj.prefix = message.substring(1, prefixEnd);
    }
    
    if (message.indexOf(' :') >= 0) {
      trailingStart = message.indexOf(' :')+2;
      trailing = message.substring(trailingStart);
    }
      
    commandAndParams = message.substring(prefixEnd+1, trailingStart-2).split(' ');
      
    chunkObj.command = commandAndParams.shift();
    
    if (commandAndParams.length > 0) {
      chunkObj.params.push(commandAndParams.shift());
    }
  
    if (trailing) {
      chunkObj.params.push(trailing);
    }
      
    return chunkObj;
};

module.exports = IrcStream;
