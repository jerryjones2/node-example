//Load libraries
const express = require('express');
var Keycloak = require('keycloak-connect');
var session = require('express-session');
var cors = require('cors');
const path = require('path');
const hbs = require('hbs');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

//Set values
var app = express();
const router = express.Router();
var port = process.env.PORT || '3000';
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, 'images', 'favicon.ico')))

// =================================================
// Initialize HBS
// =================================================
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

// =================================================
// HBS Helpers
// =================================================
hbs.registerHelper('getCurrentYear',
    () => {
        return new Date().getFullYear()
    }
)
hbs.registerHelper('screamIt', 
    (text) => {
        return text.toUpperCase()
    }
)
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
// Web Page Routes
// =================================================
router.get('/', (req, res) => {
  console.log('Success: ' + req.protocol + '://' + req.get('host') + req.originalUrl);
  res.render('home.hbs',
      {
          pageTitle: 'Home Page',
          message: 'Welcome to my Node.js Web Site!'
      }
  )
});

router.get('/about',(req,res) => {
    console.log('Success: ' + req.protocol + '://' + req.get('host') + req.originalUrl);
    let value = req.sessionID;
    res.render('about.hbs',
      {
          pageTitle: 'About Page',
          message: `Session ID ${value}`
      }
  )
});

router.get('/secured',keycloak.protect(),(req,res) => {
  console.log('Success: ' + req.protocol + '://' + req.get('host') + req.originalUrl);
  res.render('secured.hbs',
    {
      pageTitle: 'Secured Page'
    }
  )
});
router.get('/secured/2',keycloak.protect(),(req,res) => {
  console.log('Success: ' + req.protocol + '://' + req.get('host') + req.originalUrl);
  res.render('secured.hbs',
    {
      pageTitle: 'Secured Page 2'
    }
  )
});
router.get('/secured/3',keycloak.protect(),(req,res) => {
  console.log('Success: ' + req.protocol + '://' + req.get('host') + req.originalUrl);
  res.render('secured.hbs',
    {
      pageTitle: 'Secured Page 3'
    }
  )
});
router.post('/secured/posttry',keycloak.protect(),(req,res) => {
  console.log('Success: ' + req.protocol + '://' + req.get('host') + req.originalUrl);
  res.render('secured.hbs',
    {
      pageTitle: 'Secured Page From Post'
    }
  )
});
// ====================================================
// Services
// ====================================================

router.get('/service/public', function (req, res) {
  res.json({message: 'public service'});
});
router.get('/service/secured', keycloak.protect(), function (req, res) {
  res.json({message: 'secured service root'});
});
// =================================================
// Server setup
// =================================================
app.use('/', router);
app.use('*', function (req, res) {
    console.log('Invalid Request: ' + req.protocol + '://' + req.get('host') + req.originalUrl);
    res.render('error.hbs',
      {
        pageTitle: '404: Page Not Found'
      }
    )
  });
app.listen(port, () => {
    console.log(`Started on port ${port}`);
});
 
