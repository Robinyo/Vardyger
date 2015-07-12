/*!
 * Vardyger
 * Copyright(c) 2015 Rob Ferguson
 * MIT Licensed
 */

'use strict';

angular.module('vardyger')
  .controller('MainController',
    function(
      $log,
      $scope
    ) {

    $log.info('MainController');

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

  });


