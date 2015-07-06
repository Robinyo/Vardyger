/*!
 * Vardyger
 * Copyright(c) 2015 Rob Ferguson
 * MIT Licensed
 */

'use strict';

angular.module('vardyger', [
  'ionic'
])
  .config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider) {

    $ionicConfigProvider.views.maxCache(10);
    $ionicConfigProvider.views.transition('platform');
    // By default, when navigating, views that were recently visited are cached,
    // and the same instance data and DOM elements are referenced when navigating back.
    // However, when navigating back in the history, the "forward" views are removed from the cache.
    // If you navigate forward to the same view again, it'll create a new DOM element and controller instance.
    // Basically, any forward views are reset each time. Set this config to true to have forward views cached
    // and not reset on each load.
    $ionicConfigProvider.views.forwardCache(false);
    $ionicConfigProvider.backButton.icon('ion-ios7-arrow-back');
    // $ionicConfigProvider.backButton.text('');                  // default is 'Back'
    // $ionicConfigProvider.backButton.previousTitleText(false);  // hides the 'Back'
    $ionicConfigProvider.templates.maxPrefetch(20);

    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/side-menu.html',
        controller: 'SideMenuController'
      })

      .state('app.main', {
        url: '/main',
        views: {
          'menuContent': {
            templateUrl: 'templates/main.html',
            controller: 'MainController'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/main');
  })

  .run(function($ionicPlatform) {

    $ionicPlatform.ready(function() {

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }

      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

    });
  });


// Code here will be linted with JSHint.
/* jshint ignore:start */
// Code here will be ignored by JSHint.
/* jshint ignore:end */

// You can also ignore a single line with a trailing comment like this:
// ignoreThis(); // jshint ignore:line

// https://github.com/johnpapa/angular-styleguide  9047
// https://github.com/toddmotto/angularjs-styleguide  3218
// https://github.com/mgechev/angularjs-style-guide  2730
