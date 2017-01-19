var express = require('express');
var app = express();
var remoteapp = require('./remote.js');
const serverPort = 8079;


app.get('/remote', function (req, res) {
  if (!req.query) return res.sendStatus(400)
  console.log(req.query);
  var command = req.query.command.toLowerCase();
  var hub_ip = req.query.harmony_ip;
  var amt = Number(req.query.count);
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
