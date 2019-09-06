'use strict';

const
    express = require('express'),
    homeController = require('../controllers/public');

let router = express.Router();

router.get('/', homeController.index);
router.get('/about', homeController.about);


module.exports = router;