(function() {
  'use strict';

  function WelcomeCtrl($scope, highscores, $state, Profile) {
    var self = this;
    self.highscores = highscores;

    self.startGame = function() {
      if (!self.username) {
        return;
      }
      Profile.setUsername(self.username);
      $state.go('game');
    };
  }
  WelcomeCtrl.$inject = ['$scope', 'highscores', '$state', 'Profile'];
  WelcomeCtrl.resolve = {
    highscores: ['Highscore', function(Highscore) {
      return Highscore.all;
    }]
  };

  function WelcomeConfig($stateProvider) {
    $stateProvider.state('welcome', {
      url: '/',
      templateUrl: 'welcome/welcome.html',
      controller: 'WelcomeCtrl',
      controllerAs: 'ctrl',
      resolve: WelcomeCtrl.resolve
    });
  }
  WelcomeConfig.$inject = ['$stateProvider'];

  angular.module('wordgame.welcome')
  .config(WelcomeConfig)
  .controller('WelcomeCtrl', WelcomeCtrl);
})();
