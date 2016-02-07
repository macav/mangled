(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name wordgame.game:HighscoreService
   * @description
   * # Highscore service
   * Used to get and publish highscores
   */
  function HighscoreService($firebaseArray, FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl+'highscores');
    var highscores = $firebaseArray(ref);

    return {
      /**
       * @ngdoc method
       * @name wordgame.game:HighscoreService.all
       * @methodOf wordgame.game:HighscoreService
       * @description
       * # Returns all highscores
       */
      all: function() {
        return highscores.$loaded();
      },
      /**
       * @ngdoc method
       * @name wordgame.game:HighscoreService.top15
       * @methodOf wordgame.game:HighscoreService
       * @description
       * # Returns only top 15 highscores
       */
      top15: function() {
        return $firebaseArray(ref.orderByChild('score').limitToLast(15)).$loaded();
      },
      /**
       * @ngdoc method
       * @name wordgame.game:HighscoreService.publish
       * @methodOf wordgame.game:HighscoreService
       * @description
       * # Publish score for specific user
       */
      publish: function(username, score, words) {
        highscores.$add({username: username, score: score, words: words});
      }
    };
  }
  HighscoreService.$inject = ['$firebaseArray', 'FirebaseUrl'];

  angular.module('wordgame.game')
  .factory('Highscore', HighscoreService);
})();
