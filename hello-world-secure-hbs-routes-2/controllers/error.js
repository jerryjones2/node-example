'use strict';

function index (req, res) {
    res.render('error.hbs',
        {
        pageTitle: '404: Page Not Found'
        }
    )
}

module.exports = {
    index: index
};