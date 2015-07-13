/*!
 * Vardyger
 * Copyright(c) 2015 Rob Ferguson
 * MIT Licensed
 */

'use strict';

// Reference the 'vardyger' module to attach a controller

angular.module('vardyger')
  .controller('MainController',
    function(
      $log,   // inject the $log service
      $scope  // inject the $scope service
    ) {

      $log.info('MainController');

      // Remember, values on $scope are called models and are also available in views.

      $scope.listItems = [];

      /*

      $scope.listItems = [

        { id: '1',
          iconLeft: 'ion-ios-paper-outline',
          name: 'Annotating JavaScript using JSDoc tags',
          href: '#'
        },

        { id: '2',
          iconLeft: 'ion-ios-cart-outline',
          name: 'Express, Handlebars and Ghost Themes',
          href: '#'
        }

      ];

      */

  });


