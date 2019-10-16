'use strict';

var {mongoose} = require('../db/mongoose-atlas.js');
var {Todo} = require('../db/models/todo');

function index (req, res) {
    //find all with case insensitive sort on the field "text"
    //Todo.find().then((result) => {
    Todo.find().collation({ locale: "en" }).sort({text:1}).then((todos) => {
        res.render('secured.hbs',
        {
            pageTitle: 'Secured Page',
            todos: todos
        }
    )
    }, (e) => {
        res.status(400).send(e)
    })

}

function secured2 (req, res) {
    res.render('home.hbs',
        {
            pageTitle: 'Secured 2',
            message: 'Welcome to Secured 2 Page'
        }
    )
}
function secured3 (req, res) {
    res.render('home.hbs',
        {
            pageTitle: 'Secured 3',
            message: 'Welcome to Secured 3 Page'
        }
    )
}


module.exports = {
    index,
    secured2,
    secured3
};