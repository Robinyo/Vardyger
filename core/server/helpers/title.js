'use strict';

/**
 * Module dependencies
 * If a module is a directory, the file in the module directory that will be evaluated must be named index.js
 */

// Overrides the standard behaviour of `{[title}}` to ensure the content is correctly escaped

var hbs = require('express-hbs');

function title(options) {
  return new hbs.handlebars.SafeString(hbs.handlebars.Utils.escapeExpression(this.title || ''));
}

module.exports = title;