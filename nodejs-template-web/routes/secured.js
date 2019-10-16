'use strict';

const
    express = require('express'),
    controller = require('../controllers/secured');

let router = express.Router();
let keycloak = require('../server.js').keycloak;

router.get('/', keycloak.protect(),controller.index);

router.get('/2', keycloak.protect(),controller.secured2);

router.get('/3', keycloak.protect(),controller.secured3);



module.exports = router;