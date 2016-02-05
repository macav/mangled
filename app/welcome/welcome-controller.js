(function() {
  'use strict';

  function WelcomeConfig($stateProvider) {
    $stateProvider.state('welcome', {
      url: '/',
      templateUrl: 'welcome/welcome.html',
      controller: 'WelcomeCtrl',
      controllerAs: 'ctrl'
    });
  };
  WelcomeConfig.$inject = ['$stateProvider'];

  function WelcomeCtrl($scope, $firebaseObject) {
    
  };
  WelcomeCtrl.$inject = ['$scope', '$firebaseObject']

  WelcomeCtrl.$inject = ['$scope', 'Highscore', '$state', '$firebaseArray'];

  angular.module('wordgame.welcome')
  .config(WelcomeConfig)
  .controller('WelcomeCtrl', WelcomeCtrl);
})();
