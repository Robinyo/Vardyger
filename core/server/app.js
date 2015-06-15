'use strict';

var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');

var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();

module.exports = app;

var config = {
  appRoot: __dirname
};

SwaggerExpress.create(config, function(err, swaggerExpress) {

  if (err) { throw err; }

  app.use(SwaggerUi(swaggerExpress.runner.swagger));

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);
});

// DEBUG=swagger-tools:middleware:* node .
// https://github.com/apigee-127/swagger-tools/blob/master/docs/Middleware.md

// cd ~/opt/WebStorm/projects/Vardyger/core/server
// swagger project start
// swagger project edit