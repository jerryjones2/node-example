'use strict';

const
    express = require('express'),
    controller = require('../controllers/todos');

let router = express.Router();
let keycloak = require('../server.js').keycloak;

var {Todo} = require('../db/models/todo');

router.get('/todos',keycloak.protect(),controller.getAll);

router.post('/todos',keycloak.protect(),controller.create);


module.exports = router;