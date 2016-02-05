(function() {
  'use strict';

  function WelcomeConfig($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'welcome/welcome.html',
      controller: 'WelcomeCtrl'
    });
  };
  WelcomeConfig.$inject = ['$routeProvider'];

  function WelcomeCtrl($scope, $firebaseObject) {
    
  };
  WelcomeCtrl.$inject = ['$scope', '$firebaseObject']

  angular.module('wordgame.welcome', ['ngRoute', 'firebase'])

  .config(WelcomeConfig)

  .controller('WelcomeCtrl', WelcomeCtrl);
})();
