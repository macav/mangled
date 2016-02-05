(function() {
  'use strict';

  function GameConfig($stateProvider) {
    $stateProvider.state('game', {
      url: '/game',
      templateUrl: 'game/game.html',
      controller: 'GameCtrl'
    });
  };
  GameConfig.$inject = ['$stateProvider'];

  function GameCtrl() {

  };

  angular.module('wordgame.game', ['ui.router'])

  .config(GameConfig)

  .controller('GameCtrl', GameCtrl);
})();
