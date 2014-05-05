'use strict';

angular.module('neurocidEditorApp')
  .controller('MainCtrl', function ($scope,canvas,Editor) {
    $scope.isHidden = true ;
    // set pos in canvas
    $scope.ship = {
      getShipCount : function() {
        return canvas.canvasShapes().length
      },
      currentObj : function() {
        if(typeof canvas !== 'undefined')
          return canvas.lib.getActiveObject();
      }
    }

    canvas.initMouseEvent();

    $scope.toggleProperties = function() {
      $scope.isHidden = !$scope.isHidden;
    }

    $scope.addShip = function(TeamA) {
      Editor.addShip(TeamA)
    };

    $scope.addLine = function(num,TeamA) {
      for (var i = 0; i < num; i++) {
        Editor.addShip(TeamA);
      };
    };

    $scope.exportJson = function () {
      window.open("data:text/json;charset=utf-8," + escape( JSON.stringify( Editor.getJson() ) ) );
    };

    $scope.canvasShapes = function() {
      return canvas.canvasShapes();
    };

    $scope.getProperties = function() {
      $scope.properties = Editor.getShipProperties(this.shape)
      $scope.toggleProperties();
      // center Editor to ship loc 1 Y loc 0 X
      Editor.centerEditor(this.shape,$scope.properties.loc[1],$scope.properties.loc[0]);
      // set focus on selected shape
    };

  }).filter('isValue', function () {
   return function(input, trueValue) {
      if (input == trueValue) {
        return input
      }
   };
  }).filter('iif', function () {
    return function(input, trueValue, falseValue) {
      return input ? trueValue : falseValue;
  };
});


