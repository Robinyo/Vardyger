/*!
 * Vardyger
 * Copyright(c) 2015 Rob Ferguson
 * MIT Licensed
 */

'use strict';

// Declare a new module called 'vardyger', and list its dependencies.
angular.module('vardyger', [
  'ionic',
  'ionic.contrib.icon'
])
  .config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider) {

    $ionicConfigProvider.views.maxCache(10);
    $ionicConfigProvider.views.transition('platform');
    $ionicConfigProvider.views.forwardCache(false);
    $ionicConfigProvider.backButton.icon('ion-ios-arrow-back');
    $ionicConfigProvider.backButton.text('');                  // default is 'Back'
    $ionicConfigProvider.backButton.previousTitleText(false);  // hides the 'Back'
    $ionicConfigProvider.templates.maxPrefetch(20);

    $stateProvider
      .state('app', {
        url: '/app',
        templateUrl: 'templates/side-menu-template.html',
        controller: 'SideMenuController',
        abstract: true
      })

      .state('app.main', {
        url: '/main',
        views: {
          'menuContent': {
            templateUrl: 'templates/main-template.html',
            controller: 'MainController',
            resolve: {
              posts: function(PostsService) {
                return PostsService.findPosts();
              }
            }
          }
        }
      })

      .state('app.preview', {
        url: '/preview/:postId',
        views: {
          'menuContent': {
            templateUrl: 'templates/preview-template.html',
            controller: 'PreviewController',
            resolve: {
              post: function($stateParams, PostsService) {
                return PostsService.findPostById($stateParams.postId);
              }
            }
          }
        }
      })

      .state('app.editor', {
        url: '/editor/:postId',
        views: {
          'menuContent': {
            templateUrl: 'templates/editor-template.html',
            controller: 'EditorController',
            resolve: {
              post: function($stateParams, PostsService) {
                return PostsService.findPostById($stateParams.postId);
              }
            }
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
