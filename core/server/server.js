/*!
 * Vardyger
 * Copyright(c) 2015 Rob Ferguson
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */

var fs             = require('fs'),
    path           = require('path'),

    swagger        = require('swagger-express-mw'),
    SwaggerUi      = require('swagger-tools/middleware/swagger-ui'),

    express        = require('express'),
    hbs            = require('express-hbs'),
    helpers        = require('./helpers'),
    middleware     = require('./middleware'),
    mongoose       = require('mongoose'),

    logger         = require('morgan'),
    methodOverride = require('method-override'),
    bodyParser     = require('body-parser'),
    errorHandler   = require('errorhandler');

var app = express();

app.set('port', process.env.PORT || 10010);

var config = {
  appRoot: __dirname,
  validateResponse: false, // how to support json or html response ???
  db: 'mongodb://localhost/vardyger-dev',
  theme: 'casper' // casper goblin ...
};

// e.g., /content/themes/casper
var themeDir = path.resolve(__dirname + '../../../content/themes/' + config.theme);
//  /core (shared)
var sharedDir = path.resolve(__dirname + '../../');
// Layouts are in the theme directory
// var layoutsDir = themeDir;

app.engine('hbs', hbs.express4({
  layoutsDir: themeDir,
  defaultLayout: themeDir + '/default.hbs',
  partialsDir: themeDir + '/partials'
  // i18n:
}));
app.set('view engine', 'hbs');
app.set('views', themeDir);
app.set('view cache', false);

helpers.loadCoreHelpers();

// middleware(blogApp, adminApp);
// middleware.setupMiddleware(app);
// https://github.com/TryGhost/Ghost/blob/master/core/server/middleware/index.js#L91

var url = 'http://robferguson.org';
// var url = 'http://localhost:10010';

var themeData = {
  title: 'Rob Ferguson',
  description: 'Blog Description',
  url: url,
  navigation: true
};

hbs.updateTemplateOptions({data: {blog: themeData}});

var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
};
connect();

mongoose.connection.on('error', console.log);
// mongoose.connection.on('disconnected', connect);

// Bootstrap mongoose models
fs.readdirSync(__dirname + '/api/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/api/models/' + file);
});

swagger.create(config, function(err, swaggerExpress) {

  if (err) { throw err; }

  app.use(SwaggerUi(swaggerExpress.runner.swagger));

  app.use(logger('dev'));
  app.use(methodOverride());
  // app.use(session({ resave: true, saveUninitialized: true, secret: 'uwotm8' }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  // app.use(multer());

  // TODO: revisit server.js
  // http://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
  // app.use(require('cors')());

  app.use(express.static(sharedDir));
  app.use(express.static(themeDir));
  // console.log('express.static: ' + sharedDir);
  // console.log('express.static: ' + themeDir);

  // global.blog = { title: 'Title', description: 'Description' };
  // console.log('global.blog.title: ' + global.blog.title);

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