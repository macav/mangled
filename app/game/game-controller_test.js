'use strict';

describe('wordgame.game module', function() {
  beforeEach(module('wordgame.game'));

  var testData = {
    highscores: [],
    words: [
      {$value: 'pizza'}, {$value: 'table'}, {$value: 'chair'}, {$value: 'knife'}, {$value: 'fork'}, {$value: 'spoon'}
    ],
    session: {
      $save: function() {},
      username: 'player1',
      words: 0,
      score: 0
    }
  };
  for (var i = 0; i < 20; i++) {
    testData['highscores'].push({
      username: 'player'+i,
      score: i
    });
  }
  beforeEach(function(){
    jasmine.addMatchers({
      toEqualData: function(util, customEqualityTesters) {
        return {
          compare: function(actual, expected) {
            return {
              pass: angular.equals(actual, expected)
            };
          }
        };
      }
    });
  });
  var scope, rootScope, ctrl, $httpBackend, Profile;

  beforeEach(inject(function($rootScope, $controller, _$httpBackend_, $templateCache, _Profile_) {
    scope = $rootScope.$new();
    rootScope = $rootScope;
    $httpBackend = _$httpBackend_;
    Profile = _Profile_;
    Profile.setUsername('player1');
    ctrl = $controller('GameCtrl', {$scope: scope, words: testData['words'], session: testData['session']});
  }));

  describe('game controller', function() {
    // clear game before each test
    beforeEach(function() {
      ctrl.resetGame();
    });

    var computeWordScore = function(word) {
      return Math.floor(Math.pow(1.95, word.length/3));
    };

    it('should have controller defined', function() {
      expect(ctrl).toBeDefined();
    });

    it('should get username from profile service', inject(function(Profile) {
      expect(ctrl.session.username.length).toBeGreaterThan(0);
      expect(ctrl.session.username).toEqual(Profile.getUsername());
    }));

    it('should have default score 0', function() {
      expect(ctrl.session.score).toEqual(0);
    });

    it('should load a list of words', function() {
      expect(ctrl.words).toBeDefined();
      expect(ctrl.words).toEqualData(testData['words']);
    });

    it('should start game countdown', function() {
      expect(ctrl.count).toBeGreaterThan(0);
    });

    it('should set correct score for the current word', function() {
      expect(ctrl.wordScore).toEqual(0);
      var shuffledWords = [].concat(ctrl.words);
      ctrl.nextWord();
      expect(ctrl.correctWord).toBe(shuffledWords[0].$value);
      expect(ctrl.wordScore).toBe(computeWordScore(ctrl.correctWord));
    });

    it('should increase total score when a correct guess is submitted', function() {
      expect(ctrl.session.score).toEqual(0);
      ctrl.nextWord();
      ctrl.guess = ctrl.correctWord;
      var correctScore = ctrl.wordScore;
      scope.$digest();
      expect(ctrl.session.score).toEqual(correctScore);
    });

    it('should not increase total score when a incorrect guess is submitted', function() {
      expect(ctrl.session.score).toEqual(0);
      ctrl.nextWord();
      ctrl.guess = 'abc';
      scope.$digest();
      expect(ctrl.session.score).toEqual(0);
    });

    it('should decrease word score if a character is deleted from the guess', function() {
      ctrl.nextWord();
      var maxScore = computeWordScore(ctrl.correctWord);
      expect(ctrl.wordScore).toEqual(maxScore);
      ctrl.guess = 'abc';
      scope.$digest();
      expect(ctrl.wordScore).toEqual(maxScore);
      ctrl.guess = 'ab';
      scope.$digest();
      expect(ctrl.wordScore).toEqual(maxScore-1);
    });

    it('should decrease word score if more than one characters are deleted from the guess at once', function() {
      ctrl.nextWord();
      var maxScore = computeWordScore(ctrl.correctWord);
      expect(ctrl.wordScore).toEqual(maxScore);
      ctrl.guess = 'abc';
      scope.$digest();
      expect(ctrl.wordScore).toEqual(maxScore);
      ctrl.guess = 'a';
      scope.$digest();
      expect(ctrl.wordScore).toEqual(maxScore-2);
    });

    it('should not decrease word score below 0', function() {
      ctrl.nextWord();
      var maxScore = computeWordScore(ctrl.correctWord);
      expect(ctrl.wordScore).toEqual(maxScore);
      // 10 times add and delete character in guess
      for (var i = 0; i < 10; i++) {
        ctrl.guess = 'abc';
        scope.$digest();
        ctrl.guess = 'ab';
        scope.$digest();
      }
      expect(ctrl.wordScore).toBe(0);
    });
  });
});
