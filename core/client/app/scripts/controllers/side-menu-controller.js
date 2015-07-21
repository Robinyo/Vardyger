/*!
 * Vardyger
 * Copyright(c) 2015 Rob Ferguson
 * MIT Licensed
 */

'use strict';

/*
 * Dependency Injection Syntax and AngularJS
 * The notation that we have used is one of the two ways in which we can declare AngularJS controllers
 * (or services, directives, or filters). The style we have used, which is also the recommended way,
 * is the safe-style of Dependency Injection, or declaration.
 */

angular.module('vardyger')
  .controller('SideMenuController', ['$log', '$scope', '$translate',
    function(
      $log,         // inject the $log service
      $scope,       // inject the $scope service
      $translate    // inject the $translate service
    ) {

      $log.info('SideMenuController');

      $scope.switchLanguage = function (key) {
        $log.info('switchLanguage() to ' + key);
        $translate.use(key);
      };

  }]);

