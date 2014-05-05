'use strict';

angular.module('neurocidEditorApp')
  .controller('MainCtrl', function ($scope,canvas,Editor,$timeout,Ship) {
    $scope.isHidden = true ;
    // set pos in canvas
    $(document).mousemove(function (evt) {
      $scope.currentMousePosX = ( evt.pageX - $('#editor').offset().left ) + $('#editor').scrollLeft();
      $scope.currentMousePosY = ( evt.pageY - $('#editor').offset().top  ) + $('#editor').scrollTop();
    });

    $scope.keyPress = function(event) {
      console.log(event.which);
      switch(event.which) {
        case 83:
          console.log('newShip TeamA'); // key S
          Ship.createShip(true,$scope.currentMousePosX,$scope.currentMousePosY);
          break;
        case 65: // key a
          console.log('new Facilities TeamA'); // key A
          Ship.createFacilities(true,$scope.currentMousePosX,$scope.currentMousePosY);
          break;
        case 87:
          console.log('newShip TeamB'); // key S
          Ship.createShip(false,$scope.currentMousePosX,$scope.currentMousePosY);
          break
        case 81:
          console.log('new Facilities TeamB'); // key A
          Ship.createFacilities(false,$scope.currentMousePosX,$scope.currentMousePosY);
          break
        case 46:
          console.log('deleat entry');
          canvas.remove(canvas.getActiveObject());
      }
    }

    $scope.ship = {
      getShipCount : function() {
        return canvas.canvasShapes().length
      },
      currentObj : function() {
        if(typeof canvas !== 'undefined')
          return canvas.lib.getActiveObject();
      }
    }
    $timeout(function() {
      // directive overides devault behavior
      var editorDiv = document.getElementById('editor');
      editorDiv.scrollLeft = 1500;
      editorDiv.scrollTop = 1500;

      // init ship
      Editor.addShip(true)
    })

    canvas.initMouseEvent();

    $scope.toggleProperties = function() {
      $scope.isHidden = !$scope.isHidden;
    }

    $scope.addShip = function(TeamA) {
      Editor.addShip(TeamA)
    };

    $scope.getFacilities = function() {
      Ship.getFacilities();
    };

    $scope.addFacilities = function(TeamA) {
      Editor.addFacilities(TeamA)
    };

    $scope.addLine = function(num,TeamA) {
      for (var i = 0; i < num; i++) {
        Editor.addShip(TeamA);
      };
    };

    $scope.exportJson = function () {
      var aa = document.getElementById('jsonexport')
      var encodeJson = window.btoa( JSON.stringify( Editor.getJson() ) )
      aa.download = "schema.nej"
      aa.href = "data:text/json;base64," + encodeJson;
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

    $scope.removeEntry = function() {
      console.log(this.shape);
      //console.log(canvas.getActiveObject());
      canvas.remove(this.shape);
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
  }).directive('resize', function ($window) {
    // this directive will override scrollleft position with $timeout it is posible to set the scrollpsoition
    return function (scope, element) {
      var w = angular.element($window);
      scope.$watch(function () {
        return { 'h': w.height(), 'w': w.width() };
      }, function (newValue, oldValue) {
        scope.windowHeight = newValue.h;
        scope.windowWidth = newValue.w;

        scope.style = function () {
          return {
            'height': (newValue.h - 75) + 'px'
          };
        };
      }, true);
      w.bind('resize', function () {
        scope.$apply();
      });
    }
});
