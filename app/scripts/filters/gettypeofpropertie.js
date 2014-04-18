'use strict';

angular.module('neurocidEditorApp')
  .filter('getTypeOfPropertie', function () {
    return function (input) {
      return typeof input;
    };
  });
