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
  .controller('SideMenuController', ['$log', '$scope', function($log, $scope) {

    // var self = this;
    // self.listItems = [

    $log.info('SideMenuController');

    $scope.listItems = [

      /*

      { iconLeft: 'ion-person',
        name: 'VISIT BLOG',
        fn: ''
      },

      */

      { iconLeft: 'ion-ios-paper',
        name: 'Content',
        fn: ''
      },

      { iconLeft: 'ion-plus-round',
        name: 'New Post',
        fn: ''
      },

      { iconLeft: 'ion-gear-b',  // ion-settings
        name: 'Settings',
        fn: ''
      }

    ];

  }]);
