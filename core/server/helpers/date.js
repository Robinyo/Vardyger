'use strict';

/**
 * Module dependencies
 */

var moment = require('moment');

function date(context, options) {

  var output = '';

  context = context === null ? undefined : context;

  output = moment(context).fromNow();

  return output;
}

module.exports = date;