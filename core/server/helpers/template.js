'use strict';

/**
 * Module dependencies
 */

var hbs = require('express-hbs');

// Execute a template helper
// All template helpers are registered as partial views.

function execute(name, context, options) {

  var partial = hbs.handlebars.partials[name];

  if (partial === undefined) {
    // errors.logAndThrowError('Template ' + name + ' not found.');
    console.log('partial === undefined');
    return;
  }

  // If the partial view is not compiled, it compiles and saves in handlebars
  if (typeof partial === 'string') {
    hbs.registerPartial(partial);
  }

  return new hbs.handlebars.SafeString(partial(context, options));
}

module.exports = {
  execute: execute
}