module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/firebase/firebase.js',
      'app/bower_components/angularfire/dist/angularfire.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/mocks/*.js',
      'app/**/*-module.js',
      'app/*.js',
      'app/components/**/*.js',
      'app/welcome/**/*.js',
      'app/game/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
