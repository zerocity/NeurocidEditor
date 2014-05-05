'use strict';

angular
  .module('neurocidEditorApp', [
    'ngSanitize',
    'ngRoute',
    'xeditable'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function(editableOptions) {
    editableOptions.theme = 'default'; // bootstrap3 theme. Can be also 'bs2', 'default'
  });
/*    'ngCookies', 'ngResource',*/
