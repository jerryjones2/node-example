//Load libraries
const express = require('express');
var Keycloak = require('keycloak-connect');
var session = require('express-session');
var cors = require('cors');
const path = require('path');
var favicon = require('serve-favicon');

//Set values
var app = express();
const router = express.Router();
var port = process.env.PORT || '3000';
app.use(favicon(path.join(__dirname, 'images', 'favicon.ico')))

// =================================================
// Redhat SSO (Keycloak) Setup
// =================================================
// Enable CORS support
app.use(cors());

// Create a session-store to be used by both the express-session
// middleware and the keycloak middleware.
var memoryStore = new session.MemoryStore();
app.use(session({
  secret: '7ceaee9b-efe6-45d7-88b0-ab07df9379a2',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));
// Provide the session store to the Keycloak so that sessions
// can be invalidated from the Keycloak console callback.
//
// Additional configuration is read from keycloak.json file
// installed from the Keycloak web console.
var keycloak = new Keycloak({
    store: memoryStore
  });
  router.use(keycloak.middleware({
    logout: '/logout',
    admin: '/'
  }));

// =================================================
// URL Routes
// =================================================
router.get('/',(req,res) => {
    console.log('Success: ' + req.protocol + '://' + req.get('host') + req.originalUrl);
    res.sendFile(path.join(__dirname+'/www/public.html'));
});

router.get('/secured',keycloak.protect(),(req,res) => {
    console.log('Success: ' + req.protocol + '://' + req.get('host') + req.originalUrl);
    res.sendFile(path.join(__dirname+'/www/secured.html'));
});

router.get('/tngov',keycloak.protect(),(req,res) => {
  console.log('Success: ' + req.protocol + '://' + req.get('host') + req.originalUrl);
  res.sendFile(path.join(__dirname+'/www/TNGov.html'));
});

// =================================================
// Server setup
// =================================================
app.use('/', router);
app.use('*', function (req, res) {
    console.log('Invalid Request: ' + req.protocol + '://' + req.get('host') + req.originalUrl);
    res.send('Page Not Found (404)');
  });
app.listen(port, () => {
    console.log(`Started on port ${port}`);
});
 
