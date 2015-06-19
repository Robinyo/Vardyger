'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');
var fs = require('fs');

var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');

// var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
// var session = require('express-session');
var bodyParser = require('body-parser');
// var multer = require('multer');
var errorHandler = require('errorhandler');
var hbs = require('express-hbs');
var mongoose = require('mongoose');

var app = express();

// all environments
app.set('port', process.env.PORT || 10010);

var config = {
  appRoot: __dirname,
  validateResponse: false, // how to support json or html response ???
  db: 'mongodb://localhost/vardyger-dev',
  theme: 'troll'
};

// /content/themes/troll
var themeDir = path.resolve(__dirname + '../../../content/themes/' + config.theme);

// Layouts are in the theme directory
var layoutsDir = themeDir;

app.engine('hbs', hbs.express4({
  layoutsDir: layoutsDir,
  defaultLayout: layoutsDir + '/default.hbs',
  partialsDir: layoutsDir + '/partials'
  // i18n:
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

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

  // app.use(favicon(__dirname + '/public/images/favicon.ico'));
  // app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
  app.use(logger('dev'));
  app.use(methodOverride());
  // app.use(session({ resave: true, saveUninitialized: true, secret: 'uwotm8' }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  // app.use(multer());

  // app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(themeDir));
  console.log('express.static: ' + themeDir);

  // error handling middleware should be loaded after loading routes
  if ('development' == app.get('env')) {
    app.use(errorHandler());
  }

  swaggerExpress.register(app);

  app.listen(app.get('port'));
});

module.exports = app;

/*

  // https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
  // https://github.com/apigee-127/swagger-tools/blob/master/docs/Middleware.md

  // DEBUG=swagger-tools:middleware:* node

  // cd ~/opt/WebStorm/projects/Vardyger/core/server
  // swagger project start
  // swagger project edit
  // http://localhost:10010/docs

ulimit -n 1024 && mongod --config /usr/local/etc/mongod.conf

...

mongo
show dbs
use vardyger-dev
show collections

db.posts.find()
db.posts.drop()

exit

*/