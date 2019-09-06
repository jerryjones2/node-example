// Read the certificate authority
var caPath = __dirname + "/ssl/ca.pem";
var hostname = "ag03sdclb00041.dcsouth.tenn,ag03sdclb00042.dcsouth.tenn,ag03sdclb00043.dcsouth.tenn";
var setname = "aemrs";
var auth = "DevJerry:";
// Connect validating the returned certificates from the server

var fs = require('fs');
var mongoose = require('mongoose');
var certFileBuf = fs.readFileSync(caPath);
var mongoUrl = `mongodb://${auth}@${hostname}:27017/admin?replicaSet=${setname}&ssl=true`;
var options = {
  replset: { sslCA: certFileBuf },
  poolSize: 4,
  useNewUrlParser: true
}
var con = mongoose.createConnection(mongoUrl, options);
console.log("Mongo: Connected");

// https://mongoosejs.com/docs/connections.html#connection_pools



con.disconnect;
console.log("Mongo: Disconnect");

module.exports = {
    mongoose: mongoose
};