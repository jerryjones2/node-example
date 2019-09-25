'use strict';

const
    express = require('express'),
    controller = require('../controllers/error');

let router = express.Router();

router.get('/', controller.index);

module.exports = router;
