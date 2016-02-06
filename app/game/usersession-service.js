(function() {
  'use strict';

  function UserSessionService($firebaseArray, $firebaseObject, FirebaseUrl, $q, Highscore) {
    var ref = new Firebase(FirebaseUrl+'sessions');
    var sessions = $firebaseArray(ref);

    var UserSession = $firebaseObject.$extend({
      publishAndClose: function() {
        Highscore.publish(this.username, this.score, this.words);
        return this.$remove();
      }
    });

    return {
      get: function(key) {
        return new UserSession(ref.child(key));
      },
      startNew: function(user) {
        var deferred = $q.defer();
        var self = this;
        sessions.$add({username: user || 'No name', score: 0, words: 0}).then(function(ref) {
          deferred.resolve(self.get(ref.key()));
        });
        return deferred.promise;
      },
      all: sessions
    };
  }
  UserSessionService.$inject = ['$firebaseArray', '$firebaseObject', 'FirebaseUrl', '$q', 'Highscore'];

  angular.module('wordgame.game')
  .factory('UserSession', UserSessionService);
})();
