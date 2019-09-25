'use strict';

const
    express = require('express'),
    controller = require('../controllers/salary');

let router = express.Router();
//let keycloak = require('../server.js').keycloak;

router.get('/', controller.index);

router.post('/search', controller.search);

router.get('/distinctAgencyNames', controller.distinctAgencyNames);

module.exports = router;