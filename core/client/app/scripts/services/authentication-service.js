/*!
 * Vardyger
 * Copyright(c) 2015 Rob Ferguson
 * MIT Licensed
 */

'use strict';

// Reference the 'vardyger' module to attach a factory

angular.module('vardyger')
  .factory('AuthenticationService',
    function(
      $log,                // inject the $log service
      $rootScope,          // inject the $rootScope service
      $http,               // inject the $http service
      authService,         // inject the authService service
      localStorageService  // inject the localStorageService service
    ) {

      $log.info('AuthenticationService');

      var loggedIn = false;

      var service = {

        login: function(credentials) {

          $log.info('AuthenticationService.login()');

          $http.post('https://login', { user: credentials }, { ignoreAuthModule: true })

            .success(function (data, status, headers, config) {

              $log.info('AuthenticationService.login() - success');

              loggedIn = true;

              $http.defaults.headers.common.Authorization = data.authorizationToken;
              // A more secure approach would be to store the token in SharedPreferences
              // for Android and keychain for iOS
              localStorageService.set('authorizationToken', data.authorizationToken);

              // Need to inform the http-auth-interceptor that the user has logged in successfully.
              // To do this, we pass in a function that will configure the request headers with the
              // authorization token so previously failed requests(aka with status == 401) will be
              // resent with the authorization token placed in the header
              authService.loginConfirmed(data, function(config) {
                config.headers.Authorization = data.authorizationToken;
                return config;
              });
            })

            .error(function (data, status, headers, config) {
              $log.info('AuthenticationService.login() - error');
              $rootScope.$broadcast('event:auth-login-failed', status);
            });
        },

        isLoggedIn: function() {
          $log.info('AuthenticationService.isLoggedIn()');
          return loggedIn;
        },

        loginCancelled: function() {
          $log.info('loginCancelled()');
          authService.loginCancelled();
        },

        logout: function() {

          $log.info('AuthenticationService.logout()');

          loggedIn = false;

          $http.post('https://logout', {}, { ignoreAuthModule: true })
            .finally(function(data) {
              localStorageService.remove('authorizationToken');
              delete $http.defaults.headers.common.Authorization;
              $rootScope.$broadcast('event:auth-logout-complete');
            });
        }

      };

      return service;

  });
