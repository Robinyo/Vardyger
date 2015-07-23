/*!
 * Vardyger
 * Copyright(c) 2015 Rob Ferguson
 * MIT Licensed
 */

'use strict';

// Declare a new module called 'vardyger', and list its dependencies.
angular.module('vardyger', [
  'ionic',                  // inject the Ionic framework
  'ionic.contrib.icon',     //
  'pascalprecht.translate'  // inject the angular-translate module
])
  .config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider, $translateProvider) {

    $translateProvider
      .useStaticFilesLoader({
        prefix: 'scripts/locales/',
        suffix: '.json'
      })
      .registerAvailableLanguageKeys(['en', 'de'], {
        'en' : 'en', 'en_GB': 'en', 'en_US': 'en',
        'de' : 'de', 'de_DE': 'de', 'de_CH': 'de'
      })
      .preferredLanguage('de')
      .fallbackLanguage('de')
      .determinePreferredLanguage()
      .useSanitizeValueStrategy('escapeParameters');

    // By default, views are cached to improve performance.
    // Set $ionicConfigProvider.views.maxCache(0); to disable cache globally
    // See: http://ionicframework.com/docs/api/directive/ionNavView/

    $ionicConfigProvider.views.maxCache(10);                     // the default is 10
    $ionicConfigProvider.views.transition('platform');
    $ionicConfigProvider.views.forwardCache(false);              // the default is false
    $ionicConfigProvider.backButton.icon('ion-ios-arrow-back');
    $ionicConfigProvider.backButton.text('');                    // default is 'Back'
    $ionicConfigProvider.backButton.previousTitleText(false);    // hides the 'Back' text
    $ionicConfigProvider.templates.maxPrefetch(20);

    $stateProvider
      .state('app', {
        url: '/app',
        // cache: false,
        templateUrl: 'templates/side-menu-template.html',
        controller: 'SideMenuController',
        abstract: true
      })

      .state('app.main', {
        url: '/main',
        // cache: false,
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
        url: '/preview/{postId}',
        // cache: false,
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
        url: '/editor/{postId}',
        // cache: false,
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

/*

 // .useStorage();

$translateProvider.translations('en', {

  MAIN_TEMPLATE_TITLE:         'Content',
  PREVIEW_TEMPLATE_TITLE:      'Preview',
  EDITOR_TEMPLATE_TITLE:       'Editor',

  SIDE_MENU_TEMPLATE_CONTENT:  'Content',
  SIDE_MENU_TEMPLATE_NEW_POST: 'New Post',
  SIDE_MENU_TEMPLATE_SETTINGS: 'Settings',


  ALL_POSTS:   'ALL POSTS',
  NO_POSTS:    'No posts :(',
  EDIT:        'EDIT',
  MARKDOWN:    'MARKDOWN',
  PREVIEW:     'PREVIEW',
  UPDATE_POST: 'UPDATE POST'

});

$translateProvider.translations('de', {

  MAIN_TEMPLATE_TITLE:         'Inhalt',
  PREVIEW_TEMPLATE_TITLE:      'Vorschau',
  EDITOR_TEMPLATE_TITLE:       'Editor',

  SIDE_MENU_TEMPLATE_CONTENT:  'Inhalt',
  SIDE_MENU_TEMPLATE_NEW_POST: 'neuer Beitrag',
  SIDE_MENU_TEMPLATE_SETTINGS: 'Einstellungen',

  ALL_POSTS:   'Alle Beiträge',
  NO_POSTS:    'keine Einträge :(',
  EDIT:        'BEARBEITEN',
  MARKDOWN:    'MARKDOWN',
  PREVIEW:     'VORSCHAU',
  UPDATE_POST: 'UPDATE BEITRAG'

});

*/
