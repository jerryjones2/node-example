'use strict';

const
    express = require('express'),
    controller = require('../controllers/public');

let router = express.Router();

router.get('/', controller.index);
router.get('/about', controller.about);


module.exports = router;