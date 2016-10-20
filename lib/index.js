'use strict'

var express = require('express');
var app = express();
var pingController = require('./controller/pingController');
var heartbeatController = require('./controller/heartbeatController');
var bodyParser = require('body-parser')

app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// http://rain.xinkaiw.com/ping
app.get('/ping', pingController.ping);

// http://rain.xinkaiw.com/heartbeat?host=xinkai&service=catalog&region=us-west-2&cpu=4&memMb=180
app.get('/heartbeat', heartbeatController.get);

// 
app.post('/heartbeat', heartbeatController.post);

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
