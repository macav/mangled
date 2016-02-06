(function() {
  'use strict';

  function GameCtrl($scope, Profile, words, session, $interval) {
    var self = this;
    var shuffleArray = function(arr) {
      for (var i = 0; i < arr.length; i++) {
        var a = parseInt(Math.random() * arr.length);
        var b = parseInt(Math.random() * arr.length);
        var tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
      }
    };

    shuffleArray(words);
    var GAME_DURATION = 40;
    self.GAME_STATES = {
      NOT_STARTED: 1,
      IN_PROGRESS: 2,
      FINISHED: 3
    };
    var gameCountdown;
    self.session = session;

    var startGame = function() {
      self.gameState = self.GAME_STATES.IN_PROGRESS;
      self.count = GAME_DURATION;
      self.nextWord();
    };
    var finishGame = function() {
      if (self.session) {
        self.session.publishAndClose();
      }
      self.gameState = self.GAME_STATES.FINISHED;
      $interval.cancel(gameCountdown);
    };

    self.resetGame = function() {
      self.words = words;
      self.wordScore = 0;
      self.gameState = self.GAME_STATES.NOT_STARTED;
      self.count = 3;
      self.session.score = 0;
      self.session.words = 0;
      self.word = null;

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
    };
    self.resetGame();

    self.nextWord = function() {
      if (!self.words.length) {
        console.log('finished!');
        finishGame();
        return;
      }
      self.word = self.words.shift().$value;
      self.correctWord = self.word;
      self.wordScore = Math.floor(Math.pow(1.95, self.word.length/3));
      // shuffle letters
      var arr = self.word.split('');
      shuffleArray(arr);
      self.word = arr.join('');
    };
    $scope.$watch(function() {
      return self.guess;
    }, function(newVal, oldVal) {
      if (newVal && oldVal && newVal.length < oldVal.length) {
        if (self.wordScore > 0) {
          self.wordScore -= 1;
        }
      }
      if (newVal && newVal === self.correctWord) {
        self.session.score += self.wordScore;
        self.session.words += 1;
        self.session.$save();
        delete self.guess;
        self.nextWord();
      }
    });
  }
  GameCtrl.$inject = ['$scope', 'Profile', 'words', 'session', '$interval'];
  GameCtrl.resolve = {
    words: ['Word', function(Word) {
      return Word.all;
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

  angular.module('wordgame.game', ['ui.router'])

  .config(GameConfig)

  .controller('GameCtrl', GameCtrl);
})();
