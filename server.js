var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var remoteapp = require('./remote.js');
const serverPort = 8079;


var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/remote', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  console.log(req.body);
  var command = req.body.command.replace(" ","_").toLowerCase();
  var hub_ip = req.body.hub_ip;
  var amt = Number(req.body.count);
  if (command && hub_ip && amt){
    res.send('Received ' + command + ' x' + amt + ' command for ' + hub_ip);
    console.log("Received " + command + " x" + amt + " command for " + hub_ip);
    remoteapp.dostuff(hub_ip, command, amt, function(res) {
      console.log(res + " " + command);
    });
  }else{
    res.send('Error');
  }

})
app.listen(serverPort);
console.log("Listening on port "+serverPort);
