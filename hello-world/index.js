const express = require('express');

var app = express();
var port = 3000;

app.get('/',(req,res) => {
    res.json({"result":"Hello World!!"});
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

