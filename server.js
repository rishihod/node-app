var express = require('express');
var bodyParser = require('body-parser');
var app = express()
    , server = require('http').createServer(app);
var port = 5000;
const working_directory_list = ['/dist/infosys/'];
app.use(express.static(__dirname + working_directory_list[0]));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
server.listen(port, console.log("Listening in the port:"+ port));
