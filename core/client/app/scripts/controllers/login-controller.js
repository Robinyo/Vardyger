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

    $scope.user = {
      username: null,
      password: null
    };

    $scope.login = function() {
      AuthenticationService.login($scope.user);
    };

    $scope.$on('event:auth-loginRequired', function(e, rejection) {
      $log.info('LoginController - event:auth-loginRequired');
      $scope.loginModal.show();
    });

    $scope.$on('event:auth-loginConfirmed', function() {
      $scope.username = null;
      $scope.password = null;
      $scope.loginModal.hide();
    });

    $scope.$on('event:auth-login-failed', function(e, status) {
      var error = 'Login failed.';
      if (status === 401) {
        error = 'Invalid Username or Password.';
      }
      $scope.message = error;
    });

    $scope.$on('event:auth-logout-complete', function() {
      $log.info('LoginController - event:auth-logout-complete');
      $state.go('app.welcome', {}, {reload: true, inherit: false});
    });

  })

  .controller('LogoutController', function($log, $scope, AuthenticationService) {

    $log.info('LogoutController');

    $scope.$on('$ionicView.enter', function() {
      $log.info('LogoutController - $ionicView.enter');
      AuthenticationService.logout();
    });

  });



