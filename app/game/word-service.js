(function() {
  'use strict';

  function WordService($firebaseArray, FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl+'words');
    var words = $firebaseArray(ref);

    return {
      all: words
    };
  }
  WordService.$inject = ['$firebaseArray', 'FirebaseUrl'];

  angular.module('wordgame.game')
  .factory('Word', WordService);
})();
