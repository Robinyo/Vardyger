/*!
 * Vardyger
 * Copyright(c) 2015 Rob Ferguson
 * MIT Licensed
 */

'use strict';

// Declare a new module called 'vardyger', and list its dependencies.
angular.module('vardyger', [
  'ionic',                  // inject the Ionic framework
  'ionic.contrib.icon',     // inject the ionic.contrib.icon module
   // 'angular-http-auth',  // in bower.json but http-auth-interceptor in http-auth-interceptor.js
  'http-auth-interceptor',  // inject the angular-http-auth module
  'LocalStorageModule',     // inject the angular-local-storage module
  'ngMockE2E',              // inject the angular-mocks module
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
    // $ionicConfigProvider.views.transition('none');
    $ionicConfigProvider.views.transition('platform');           // platform, ios, android, none
    $ionicConfigProvider.views.forwardCache(false);              // the default is false
    $ionicConfigProvider.backButton.icon('ion-ios-arrow-back');
    $ionicConfigProvider.backButton.text('');                    // default is 'Back'
    $ionicConfigProvider.backButton.previousTitleText(false);    // hides the 'Back' text
    $ionicConfigProvider.templates.maxPrefetch(20);

    $stateProvider
      .state('app', {
        url: '/app',
        templateUrl: 'templates/side-menu-template.html',
        controller: 'AppController',
        abstract: true
      })

      .state('app.welcome', {
        url: '/welcome',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/welcome-template.html'
          }
        }
      })

      .state('app.main', {
        url: '/main',
        cache: false,
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
    $urlRouterProvider.otherwise('/app/welcome');
  })

  .run(function($ionicPlatform, $httpBackend, localStorageService) {

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

    var posts = [

      {
        metaTitle: 'Ionic Style Guide',
        metaDescription: 'In a previous post, ...',
        post: {
          id: '1',
          title: 'Ionic Style Guide',
          html: '<p>In a previous post, ...</p>',
          markdown: 'In a previous post, ...'
        }
      },

      {
        metaTitle: 'Customising Ionic with Sass',
        metaDescription: 'In a previous post, ...',
        post: {
          id: '2',
          title: 'Customising Ionic with Sass',
          html: '<p>In a previous post, ...</p>',
          markdown: 'In a previous post, ...'
        }
      },

      {
        metaTitle: 'Ionic, Angular and Cordova',
        metaDescription: 'In a previous post, ...',
        post: {
          id: '3',
          title: 'Ionic, Angular and Cordova',
          html: '<p>In a previous post, ...</p>',
          markdown: 'In a previous post, ...'
        }
      },

      {
        metaTitle: 'Annotating JavaScript using JSDoc tags',
        metaDescription: 'In a previous post, ...',
        post: {
          id: '4',
          title: 'Annotating JavaScript using JSDoc tags',
          html: '<p>In a previous post, ...</p>',
          markdown: 'In a previous post, ...'
        }
      },

      {
        metaTitle: 'Express, Handlebars and Ghost Themes',
        metaDescription: 'In a previous post, ...',
        post: {
          id: '5',
          title: 'Express, Handlebars and Ghost Themes',
          html: '<p>In a previous post, ...</p>',
          markdown: 'In a previous post, ...'
        }
      },

      {
        metaTitle: 'Swagger, Express, and Content Negotiation',
        metaDescription: 'In a previous post, ...',
        post: {
          id: '6',
          title: 'Swagger, Express, and Content Negotiation',
          html: '<p>In a previous post, ...</p>',
          markdown: 'In a previous post, ...'
        }
      },

      {
        metaTitle: 'The Vardyger publishing platform :)',
        metaDescription: 'In a previous post, ...',
        post: {
          id: '7',
          title: 'The Vardyger publishing platform :)',
          html: '<p>In a previous post, ...</p>',
          markdown: 'In a previous post, ...'
        }
      }

    ];

    /* jshint ignore:start */

    // GET /vardyger/api/v1.0/posts or 401
    $httpBackend.whenGET('https://posts').respond(function (method, url, data, headers) {
      var authToken = localStorageService.get('authorizationToken');
      return authToken ? [200, posts] : [401];
    });

    $httpBackend.whenPOST('https://login').respond(function(method, url, data) {
      var authorizationToken = 'NjMwNjM4OTQtMjE0Mi00ZWYzLWEzMDQtYWYyMjkyMzNiOGIy';
      return [200 , { authorizationToken: authorizationToken } ];
    });

    $httpBackend.whenPOST('https://logout').respond(function(method, url, data) {
      return [200];
    });

    $httpBackend.whenGET(/.*/).passThrough();

    /* jshint ignore:end */

  });


// Code here will be linted with JSHint.
/* jshint ignore:start */
// Code here will be ignored by JSHint.
/* jshint ignore:end */

// You can also ignore a single line with a trailing comment like this:
// ignoreThis(); // jshint ignore:line

/*

 // .useStorage();

*/
