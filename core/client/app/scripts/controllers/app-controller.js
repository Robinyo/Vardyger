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
  .controller('AppController', ['$log', '$scope', '$ionicModal', '$translate', 'AuthenticationService',
    function(
      $log,         // inject the $log service
      $scope,       // inject the $scope service
      $ionicModal,  // inject the $ionicModal service
      $translate,    // inject the $translate service
      AuthenticationService  // inject the AuthenticationService service
    ) {

      $log.info('AppController');

      $scope.loggedIn = false;

      $scope.switchLanguage = function(key) {
        $log.info('switchLanguage() to ' + key);
        $translate.use(key);
      };

      // Login / Logout

      $ionicModal.fromTemplateUrl('templates/login-template.html', {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
      }).then(function(modal) {
        $scope.loginModal = modal;
      });

      $scope.logout = function() {
        $log.info('logout()');
        AuthenticationService.logout();
        $scope.loggedIn = false;
      };

      $scope.$on('$destroy', function() {
        $scope.loginModal.remove();
      });

    }]);

