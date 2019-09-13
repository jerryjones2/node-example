var mongoose = require('mongoose')
var fs = require('fs');
mongoose.Promise = global.Promise

var caPath = __dirname + "/ssl/ca.pem";
var hostname = "ag03sdclb00041.dcsouth.tenn,ag03sdclb00042.dcsouth.tenn,ag03sdclb00043.dcsouth.tenn";
var setname = "aemrs";
var auth = "DevJerry:";
var database = "admin";

var certFileBuf = fs.readFileSync(caPath);
var mongoUrl = `mongodb://${auth}@${hostname}:27017/${database}?replicaSet=${setname}&ssl=true`;
var options = {
  replset: { sslCA: certFileBuf },
  poolSize: 4,
  useNewUrlParser: true
}
var con = mongoose.createConnection(mongoUrl, options);
console.log("Mongo: Connected");


mongoose.connect(mongoUrl,options);

module.exports = {mongoose};


