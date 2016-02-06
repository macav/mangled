'use strict';
var FirebaseMock = {
  override: function() {
    /*jslint browser: true*/
    window.Firebase = function(ref) {
      var self = this;
      this.ref = ref;
      this.orderByChild = function() { return self; };
      this.limitToLast = function() { return self; };
    };
  },
  firebaseObject: function(baseUrl, testData) {
    return {
      $extend: function(obj) {
        for (var i in obj) {
          self[i] = obj[i];
        }
      },
      $save: function() {}
    };
  },
  firebaseArray: function(baseUrl, testData) {
    var self = this;
    var collection = [];
    self.add = function(obj) {
      collection.push(obj);
      return {
        then: function(cb) { }
      };
    };
    var funcs = {
      $add: self.add
    };
    return function(firebase) {
      var found = false;
      for(var key in testData) {
        if (baseUrl+key === firebase.ref) {
          found = true;
          collection = [].concat(testData[key]);
          for (var i in funcs) {
            collection[i] = funcs[i];
          }
          return collection;
        }
      }
      if (!found) {
        collection = [];
        for (var i in funcs) {
          collection[i] = funcs[i];
        }
        return collection;
      }
    };
  }
};
