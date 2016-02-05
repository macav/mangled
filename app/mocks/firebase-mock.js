'use strict';
var FirebaseMock = {
  override: function() {
    /*jslint browser: true*/
    window.Firebase = function(ref) {
      this.ref = ref;
    };
  },
  firebaseArray: function(baseUrl, testData) {
    var self = this;
    var collection = [];
    self.add = function(obj) {
      collection.push(obj);
    };
    return function(firebase) {
      for(var key in testData) {
        if (baseUrl+key === firebase.ref) {
          collection = [].concat(testData[key]);
          var funcs = {
            $add: self.add
          };
          for (var i in funcs) {
            collection[i] = funcs[i];
          }
          return collection;
        }
      }
    };
  }
};
