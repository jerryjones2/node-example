'use strict';

const
    express = require('express'),
    todoController = require('../controllers/todos');

let router = express.Router();
let keycloak = require('../server.js').keycloak;

var {Todo} = require('../db/models/todo');

router.get('/todos',keycloak.protect(),todoController.getAll);

router.post('/todos',keycloak.protect(),todoController.create);


module.exports = router;