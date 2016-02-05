(function() {
  'use strict';

  function HighscoreService($firebaseArray, FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl+'highscores');
    var highscores = $firebaseArray(ref);

    return {
      all: highscores
    };
  }
  HighscoreService.$inject = ['$firebaseArray', 'FirebaseUrl'];

  angular.module('wordgame.welcome')
  .factory('Highscore', HighscoreService);
})();
