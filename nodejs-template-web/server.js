'use strict';
// ====================================
//      server/index.js
// ====================================
const express = require('express');
var session = require('express-session');
var Keycloak = require('keycloak-connect');
var cors = require('cors');
const path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var server = express();

// Create a session-store to be used by both the express-session
// middleware and the keycloak middleware.
var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({
    store: memoryStore
});

function create(config) {
    // Server settings
    server.set('env', config.env);
    server.set('port', config.port);

    server.use(bodyParser.json());
    server.use(favicon(path.join(__dirname, 'static/images', 'favicon.ico')));
    server.use('/static', express.static(path.join(__dirname, 'static')));
    server.use(cors()); // Enable CORS support
    server.use(session({
        secret: 'hello-world-secure-hbs-routes-2-secret',
        resave: false,
        saveUninitialized: true,
        store: memoryStore
      }));

    var hbs = require('./hbs').create();
    server.set('view engine','hbs');

    server._router.use(keycloak.middleware({
        logout: '/logout',
        admin: '/'
    }));
    
    let routes = require('./routes');
    
    routes.init(server);

    server.use((err, req, res, next) => {
        console.log("ERROR: "+err);
        next();
    });
}

function start() {
    let port = server.get('port');

    server.listen(port, () => {
        console.log(`Started on port ${port}`);
    });
}



module.exports = {
    create,
    start,
    keycloak
}
