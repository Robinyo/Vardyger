'use strict';

/**
 * Module dependencies.
 */

var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');

var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');
// var methodOverride = require('method-override');
var mongoose = require('mongoose');
var morgan = require('morgan');

var app = express();
var port = process.env.PORT || 10010;

var config = {
  appRoot: __dirname,
  db: 'mongodb://localhost/vardyger-dev'
};

// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
};
connect();

mongoose.connection.on('error', console.log);
// mongoose.connection.on('disconnected', connect);

// Bootstrap models
fs.readdirSync(__dirname + '/api/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/api/models/' + file);
});

SwaggerExpress.create(config, function(err, swaggerExpress) {

  if (err) { throw err; }

  app.use(SwaggerUi(swaggerExpress.runner.swagger));

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  // app.use(methodOverride());

  swaggerExpress.register(app);

  app.listen(port);
});

module.exports = app;

// DEBUG=swagger-tools:middleware:* node .
// https://github.com/apigee-127/swagger-tools/blob/master/docs/Middleware.md

// cd ~/opt/WebStorm/projects/Vardyger/core/server
// swagger project start
// swagger project edit
// http://localhost:10010/docs

// ulimit -n 1024 && mongod --config /usr/local/etc/mongod.conf
