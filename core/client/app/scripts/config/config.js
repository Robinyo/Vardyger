/*!
 * Vardyger
 * Copyright(c) 2015 Rob Ferguson
 * MIT Licensed
 */

'use strict';

angular.module('config', [])
  .constant('ENV', {
    name:'development',
    apiEndpoint:'http://dev.yoursite.com:10000/'
  });

