(function() {
  'use strict';

  /**
   * @ngdoc service
   * @name wordgame.game:UserSessionService
   * @description
   * # User Session service
   * Used to get and start new session on backend.
   */
  function UserSessionService($firebaseArray, $firebaseObject, FirebaseUrl, $q, Highscore) {
    var ref = new Firebase(FirebaseUrl+'sessions');
    var sessions = $firebaseArray(ref);

    var UserSession = $firebaseObject.$extend({
      publishAndClose: function() {
        this.publishScore();
        return this.$remove();
      },
      publishScore: function() {
        Highscore.publish(this.username, this.score, this.words);
        this.score = 0;
        this.words = 0;
        this.$save();
      }
    });

    return {
      /**
       * @ngdoc method
       * @name wordgame.game:UserSessionService.get
       * @methodOf wordgame.game:UserSessionService
       * @param {string} key Key
       * @description Get session instance.
       * @returns {UserSession} Instance for the child specified by key.
       */
      get: function(key) {
        return new UserSession(ref.child(key));
      },
      /**
       * @ngdoc method
       * @name wordgame.game:UserSessionService.startNew
       * @methodOf wordgame.game:UserSessionService
       * @param {string} user User
       * @description Start new session.
       * @returns {promise} Promise for the user's session
       */
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
