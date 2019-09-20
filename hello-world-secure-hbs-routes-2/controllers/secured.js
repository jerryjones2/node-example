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



module.exports = {
    index: index
};