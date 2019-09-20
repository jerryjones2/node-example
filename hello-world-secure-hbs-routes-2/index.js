'use strict';

const
    server = require('./server.js'),
    config = require('./config.js');

console.log(config.toString());

server.create(config);
server.start();