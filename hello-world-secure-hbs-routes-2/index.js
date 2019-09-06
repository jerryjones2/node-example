'use strict';

const
    server = require('./server.js'),
    config = require('./config.js');

var mongoose = require('./mongodb.js').mongoose;

console.log(config.toString());

server.create(config);
server.start();