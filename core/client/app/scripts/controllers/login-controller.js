/*!
 * Vardyger
 * Copyright(c) 2015 Rob Ferguson
 * MIT Licensed
 */

'use strict';

// Reference the 'vardyger' module to attach a controller

angular.module('vardyger')
  .controller('LoginController',
  function(
    $log,                  // inject the $log service
    $scope,                // inject the $scope service
    $http,                 // inject the $http service
    $state,                // inject the $state service
    AuthenticationService  // inject the AuthenticationService service
  ) {

    $log.info('LoginController');

    $scope.message = '';

    $scope.credentials = {
      grant_type: 'password',
      username: null,
      password: null,
      client_id: 'ghost-admin'
    };

    $scope.login = function() {
      AuthenticationService.login($scope.credentials);
    };

    $scope.$on('event:auth-loginRequired', function(e, rejection) {
      $log.info('LoginController - event:auth-loginRequired');
      $scope.loginModal.show();
    });

    $scope.$on('event:auth-loginConfirmed', function() {
      $log.info('LoginController - event:auth-loginConfirmed');
      // $scope.username = null;
      // $scope.password = null;
      $scope.loginModal.hide();
    });

    $scope.$on('event:auth-login-failed', function(e, status) {
      $log.info('LoginController - event:auth-login-failed');
      var error = 'Login failed.';
      if (status === 401) {
        error = 'Invalid Username or Password.';
      }
      $scope.message = error;
    });

    $scope.$on('event:auth-logout-complete', function() {
      $log.info('LoginController - event:auth-logout-complete');
      // $state.go('app.welcome', {}, {reload: true, inherit: false});
      $state.go('app.welcome');
    });

  });



