'use strict';

const
    express = require('express'),
    errorController = require('../controllers/todos');

var {Todo} = require('../db/models/todo');

function getAll(req,res) {
    //Todo.find().then((result) => {
    Todo.find().collation({ locale: "en" }).sort({text:1}).then((result) => {
        res.send({
            result,
            code:"200"
        })
    }, (e) => {
        res.status(400).send(e)
    })
};

function create(req,res) {
    let json = req.body.text;
    console.log('json: '+json)
    var todo = new Todo({
        text: req.body.text
    })
    todo.save().then((doc) => {
        res.send(doc)
    },(e) => {
        res.status(400).send(e)
    })
}; 

module.exports = {
    getAll,
    create
};