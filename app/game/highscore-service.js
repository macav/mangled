(function() {
  'use strict';

  function HighscoreService($firebaseArray, FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl+'highscores');
    var highscores = $firebaseArray(ref);

    return {
      all: function() {
        return highscores.$loaded();
      },
      top15: function() {
        return $firebaseArray(ref.orderByChild('score').limitToLast(15)).$loaded();
      },
      publish: function(username, score, words) {
        highscores.$add({username: username, score: score, words: words});
      }
    };
  }
  HighscoreService.$inject = ['$firebaseArray', 'FirebaseUrl'];

  angular.module('wordgame.game')
  .factory('Highscore', HighscoreService);
})();
