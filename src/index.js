'use strict';

var Server = require('./Server');

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

var mybot = new Server(botOpts).connect();
