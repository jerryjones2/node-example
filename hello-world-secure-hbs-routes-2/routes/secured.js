'use strict';

const
    express = require('express'),
    securedController = require('../controllers/secured');

let router = express.Router();
let keycloak = require('../server.js').keycloak;

router.get('/', keycloak.protect(),securedController.index);


module.exports = router;