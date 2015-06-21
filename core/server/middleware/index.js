'use strict';

/**
 * Module dependencies
 * If a module is a directory, the file in the module directory that will be evaluated must be named index.js
 */
var hbs = require('express-hbs');

function configHbsForContext(req, res, next) {

  // var themeData = config.theme;

  var themeData = { title: 'Blog Title', description: 'Blog Description'};

  hbs.updateTemplateOptions({data: {blog: themeData}});

  next();
}

function setupMiddleware(app) {
  app.use(configHbsForContext);
}

module.exports = setupMiddleware;
// module.exports.middleware = setupMiddleware;