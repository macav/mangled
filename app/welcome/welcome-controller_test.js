'use strict';

describe('wordgame.welcome module', function() {
  FirebaseMock.override();
  beforeEach(module('wordgame.constants'));
  beforeEach(module('wordgame.welcome'));
  beforeEach(module('wordgame.game'));

  var testData = {
    highscores: []
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
  beforeEach(module(function($provide, FirebaseUrl) {
    $provide.value('$firebaseArray', FirebaseMock.firebaseArray(FirebaseUrl, testData));
  }));
  var scope, rootScope, ctrl, $httpBackend, state;

  beforeEach(inject(function($rootScope, $controller, $state, $templateCache) {
    scope = $rootScope.$new();
    rootScope = $rootScope;
    state = $state;
    ctrl = $controller('WelcomeCtrl', {$scope: scope, highscores: testData['highscores']});
    $templateCache.put('game/game.html', '');
    $templateCache.put('welcome/welcome.html', '');
    state.go('welcome');
    rootScope.$digest();
  }));

  describe('welcome controller', function() {
    it('should have controller defined', function() {
      expect(ctrl).toBeDefined();
    });

    it('should be in a correct state', function() {
      expect(state.current.name).toEqual('welcome');
    });

    it('should load highscores', function() {
      expect(ctrl.highscores).toBeDefined();
      expect(ctrl.highscores.length).toBe(testData['highscores'].length);
      expect(ctrl.highscores).toEqualData(testData['highscores']);
    });

    it('should redirect to game when a name is submitted', function() {
      ctrl.username = 'martin';
      ctrl.startGame();
      rootScope.$digest();
      expect(state.current.name).toEqual('game');
    });

    it('should save username to profile service', inject(function(Profile) {
      ctrl.username = 'martin';
      ctrl.startGame();
      rootScope.$digest();
      expect(Profile.getUsername()).toEqual('martin');
    }));

    it('should not redirect to game without a name', function() {
      ctrl.username = '';
      ctrl.startGame();
      rootScope.$digest();
      expect(state.current.name).toEqual('welcome');
    });

  });
});
