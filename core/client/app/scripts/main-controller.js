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
  .controller('MainController', ['$log', '$scope', '$state', function($log, $scope, $state) {

    // var self = this;
    // self.listItems = [

    $log.info('MainController');

    // set name="app.main" in main.html
    if ($state.is('app.main')) {
      $log.info('$state.is("app.main")');
    }

    $scope.listItems = [

      { iconLeft: 'ion-ios-paper-outline',
        name: 'Annotating JavaScript using JSDoc tags',
        href: '#'
      },

      { iconLeft: 'ion-ios-cart-outline',
        name: 'Express, Handlebars and Ghost Themes',
        href: '#'
      },

      { iconLeft: 'ion-ios-paw-outline',
        name: 'Swagger, Express, and Content Negotiation',
        href: '#'
      },

      { iconLeft: 'ion-ios-information-outline',
        name: 'The Vardyger publishing platform :)',
        href: '#'
      },

      { iconLeft: 'ion-ios-alarm-outline',
        name: 'Build your Microservices API with Swagger and Express',
        href: '#'
      },

      { iconLeft: 'ion-ios-location-outline',
        name: 'A JavaScript Microservices stack',
        href: '#'
      }

    ];

  }]);
