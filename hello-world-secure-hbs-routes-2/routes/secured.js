'use strict';

const
    express = require('express'),
    controller = require('../controllers/secured');

let router = express.Router();
let keycloak = require('../server.js').keycloak;

router.get('/', keycloak.protect(),controller.index);



module.exports = router;