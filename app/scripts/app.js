'use strict';

angular
  .module('neurocidEditorApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'xeditable',
    'mgcrea.ngStrap',
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
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
  });
