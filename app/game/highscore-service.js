(function() {
  'use strict';

  function HighscoreService($firebaseArray, FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl+'highscores');
    var highscores = $firebaseArray(ref);

    return {
      all: highscores,
      top15: $firebaseArray(ref.orderByChild('score').limitToLast(15)),
      publish: function(username, score, words) {
        highscores.$add({username: username, score: score, words: words});
      }
    };
  }
  HighscoreService.$inject = ['$firebaseArray', 'FirebaseUrl'];

  angular.module('wordgame.game')
  .factory('Highscore', HighscoreService);
})();
