'use strict';

function index (req, res) {
    res.render('secured.hbs',
        {
            pageTitle: 'Secured Page'
        }
    )
}


module.exports = {
    index: index
};