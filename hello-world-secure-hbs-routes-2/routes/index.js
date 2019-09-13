// /routes/index.js

'use strict';

 const
//     apiRoute = require('./apis'),
    publicRoute = require('./public'),
    securedRoute = require('./secured'),
    errorRoute = require('./error');

    var {Todo} = require('../db/models/todo');

function init(server) {
    server.get('*', function (req, res, next) {
        console.log('Request: ' + req.protocol + '://' + req.get('host') + req.originalUrl);
        return next();
    });

    server.get('/', function (req, res) {
        res.redirect('/public');
    });
    server.get('/about', function (req, res) {
        res.redirect('/public/about');
    });

    server.get('/all', (req,res) => {
        Todo.find().then((todos) => {
            res.send({
                todos,
                code:"200"
            })
        }, (e) => {
            res.status(400).send(e)
        })
    })

    // server.use('/api', apiRoute);
    server.use('/public', publicRoute);
    server.use('/secured', securedRoute);
    server.use('/error', errorRoute);
}

module.exports = {
    init: init
};