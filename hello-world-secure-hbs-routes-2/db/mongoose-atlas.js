var mongoose = require('mongoose')
// var fs = require('fs');
mongoose.Promise = global.Promise

var hostname = "mytn-test-cluster-o06iq.mongodb.net";
var auth = "devuser:devuser";
var database = "TodoApp";

var mongoUrl = `mongodb+srv://${auth}@${hostname}/${database}?retryWrites=true&w=majority`;
var options = {
  poolSize: 4,
  useNewUrlParser: true
}
var con = mongoose.createConnection(mongoUrl, options);

mongoose.connect(mongoUrl,options);
console.log("Mongo Atlas: Connected");

module.exports = {mongoose};
