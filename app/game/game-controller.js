(function() {
  'use strict';

  /**
   * @ngdoc controller
   * @name wordgame.game:GameCtrl
   * @description
   * # Main controller for the game
   */
  function GameCtrl($scope, Profile, words, session, $interval) {
    var self = this;

    var GAME_DURATION = 40;
    var GAME_INITIAL_COUNTDOWN = 5;
    self.GAME_STATES = {
      NOT_STARTED: 1,
      IN_PROGRESS: 2,
      FINISHED: 3
    };
    var gameCountdown;
    self.session = session;
    self.lastStats = {};

    self.resetGame = resetGame;
    self.nextWord = nextWord;

    self.resetGame();

    $scope.$watch(function() {
      return self.guess;
    }, guessChanged);
    $scope.$on('$destroy', scopeDestroyed);

    ///

    /**
     * @ngdoc method
     * @name wordgame.game:GameCtrl.startGame
     * @methodOf wordgame.game:GameCtrl
     * @description
     * # Starts a game
     * Sets gameState to GAME_STATES.IN_PROGRESS and count to GAME_DURATION, presents you the first word.
     */
    function startGame() {
      self.gameState = self.GAME_STATES.IN_PROGRESS;
      self.count = GAME_DURATION;
      self.nextWord();
    }

    /**
     * @ngdoc method
     * @name wordgame.game:GameCtrl.finishGame
     * @methodOf wordgame.game:GameCtrl
     * @description
     * # Finishes the game
     * Sets gameState to GAME_STATES.FINISHED, publishing user's score to highscores board and cancels interval.
     */
    function finishGame() {
      if (self.session) {
        self.lastStats = {
          score: self.session.score,
          words: self.session.words
        };
        self.session.publishScore();
      }
      self.gameState = self.GAME_STATES.FINISHED;
      $interval.cancel(gameCountdown);
    }

    /**
     * @ngdoc method
     * @name wordgame.game:GameCtrl.resetGame
     * @methodOf wordgame.game:GameCtrl
     * @description
     * # Resets a game
     * If user wants to try again, this method is called.
     * Resets all game variables and calls startGame().
     */
    function resetGame(start) {
      self.words = [].concat(words);
      shuffleArray(self.words);
      self.wordScore = 0;
      self.session.score = 0;
      self.session.words = 0;
      self.word = null;
      delete self.guess;

      if (start) {
        startGame();
      } else {
        self.gameState = self.GAME_STATES.NOT_STARTED;
        self.count = GAME_INITIAL_COUNTDOWN;
      }

      gameCountdown = $interval(function() {
        self.count--;
        if (self.count === 0) {
          if (self.gameState === self.GAME_STATES.NOT_STARTED) {
            // start the game
            startGame();
          } else {
            // game ended
            finishGame();
          }
        }
      }, 1000);
    }

    /**
     * @ngdoc method
     * @name wordgame.game:GameCtrl.nextWord
     * @methodOf wordgame.game:GameCtrl
     * @description
     * # Presents user with next word from the list
     * It shuffles letters in the word and counts word's score.
     */
    function nextWord() {
      if (!self.words.length) {
        finishGame();
        return;
      }
      self.word = self.words.shift().$value;
      $scope.$broadcast('animate:word-change');
      self.correctWord = self.word;
      self.wordScore = Math.floor(Math.pow(1.95, self.word.length/3));
      self.wordMaxScore = self.wordScore;
      // shuffle letters
      var arr = self.word.split('');
      shuffleArray(arr);
      self.word = arr.join('');
    }

    /**
     * @ngdoc method
     * @name wordgame.game:GameCtrl.guessChanged
     * @methodOf wordgame.game:GameCtrl
     * @description
     * # Handler called when guess changes
     * If the guess is equal to the correct word, score is added to total score.
     */
    function guessChanged(newVal, oldVal) {
      if (oldVal && (newVal === '' || (newVal && newVal.length < oldVal.length))) {
        if (self.wordScore > 0) {
          self.wordScore -= (newVal ? (oldVal.length - newVal.length) : oldVal.length);
          $scope.$broadcast('animate:word-incorrect');
        }
      }
      if (newVal && newVal === self.correctWord) {
        self.session.score += self.wordScore;
        self.session.words += 1;
        $scope.$broadcast('animate:word-correct');
        self.session.$save();
        delete self.guess;
        self.nextWord();
      }
    }

    function scopeDestroyed() {
      self.session.$remove();
    }

    function shuffleArray(arr) {
      for (var i = 0; i < arr.length/2; i++) {
        var a = parseInt(Math.random() * arr.length);
        var b = parseInt(Math.random() * arr.length);
        var tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
      }
    }
  }
  GameCtrl.$inject = ['$scope', 'Profile', 'words', 'session', '$interval'];
  GameCtrl.resolve = {
    words: ['Word', function(Word) {
      return Word.all();
    }],
    session: ['Profile', 'UserSession', function(Profile, UserSession) {
      return UserSession.startNew(Profile.getUsername());
    }]
  };

  function GameConfig($stateProvider) {
    $stateProvider.state('game', {
      url: '/game',
      templateUrl: 'game/game.html',
      controller: 'GameCtrl',
      controllerAs: 'ctrl',
      resolve: GameCtrl.resolve
    });
  }
  GameConfig.$inject = ['$stateProvider'];

  angular.module('wordgame.game')
  .config(GameConfig)
  .controller('GameCtrl', GameCtrl);
})();
