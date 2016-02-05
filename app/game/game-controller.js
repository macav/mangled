(function() {
  'use strict';

  function GameConfig($routeProvider) {
    $routeProvider.when('/game', {
      templateUrl: 'game/game.html',
      controller: 'GameCtrl'
    });
  };
  GameConfig.$inject = ['$routeProvider'];

  function GameCtrl() {

  };

  angular.module('wordgame.game', ['ngRoute'])

  .config(GameConfig)

  .controller('GameCtrl', GameCtrl);
})();
