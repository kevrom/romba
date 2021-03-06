'use strict';

var util = require('util');
var Client = require('./lib/Client');
var Server = require('./lib/Server');

var botOpts = {
	server: {
		port: 6667,
		host: 'irc.freenode.net'
	},
	user: {
		nick: 'romba',
		realname: 'Bob Dole'
	}
}

var mybot = new Client(botOpts).init();
