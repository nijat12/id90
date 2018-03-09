'use strict';

var express = require('express'),
    chalk = require('chalk'),
    bodyParser = require('body-parser'),
    app = express();

var server = require('http').createServer(app);

app.use(bodyParser.json());

// app.use(express.static(__dirname + '/pubic'));

require('./routes')(app);

server.listen(process.env.PORT, () => {
    console.log(chalk.green('Listening on port 3000'));
});

exports = module.exports = app;