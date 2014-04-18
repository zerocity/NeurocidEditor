'use strict';

angular.module('neurocidEditorApp')
  .controller('MainCtrl', function ($scope,canvas,Ship) {

    $scope.canvasScale = canvas.getCanvasScale();

    $scope.addShip = function(TeamA) {
      Ship.createShip(TeamA);
    };

    $scope.addLine = function(num) {
      var shipLine = []
      for (var i = 0; i < num; i++) {
        var ship = new Ship({left: 20 , top: 20 * i });
        shipLine.push(ship)
      };

      var shipGroup = new fabric.Group(shipLine, {left: 20, top: 20 });

      canvas.add(shipGroup);
    };

    $scope.getShipsJson = function() {
      //return console.log(JSON.stringify(canvas.objects.toJSON()));
      return Ship.getShips();
    };

    $scope.getJson = function (){
      var Team = $scope.getShipsJson();
      var Senario = {
          "BattleFieldLayout": {
            "width": 300000,
            "height": 300000,
            "iterations": 1500
          },
          "PhysicsLayout": {
            "gravity": [
              0,
              0
            ],
            "timeStep": 0.033,
            "positionIterations": 2,
            "velocityIterations": 6,
            "coordToMetersFactor": 0.03
          },
          "ScannerLayout": {
            "disableClusterCenters": true,
            "numClusters": 3,
            "numFriends": 20,
            "numEnemies": 20,
            "numProjectiles": 20
          },
          "TeamA":Team.TeamA,
          "TeamB":Team.TeamB
          };
          console.log(Senario);
      return Senario
    };

    $scope.exportJson = function () {
      var json = JSON.stringify($scope.getJson());
      window.open("data:text/json;charset=utf-8," + escape(JSON.stringify($scope.getJson())));
    };

    $scope.canvasShapes = function() {
      return canvas.canvasShapes();
    };

    $scope.selectShape = function() {
      //this works great when click the relevant div in DOM
      //$scope.properties = this.shape.toJSON();
      canvas.setActiveObject(this.shape);
    };

    $scope.getProperties = function() {
      $scope.properties = Ship.getProperties(this.shape)
      canvas.setActiveObject(this.shape);
      $('.properties').toggleClass('hide');
      canvas.calcOffset();
    };

    $scope.setProperties = function() {
      console.log(canvas.getActiveObject());
    };

    $scope.currentShape = function() {
      //the change here is not triggered when picking an object directly on canvas
      if(typeof canvas !== 'undefined')
        return canvas.lib.getActiveObject();
    };

    fabric.util.addListener(document.getElementById('editor'), 'scroll', function () {
        console.log('scroll');
        canvas.calcOffset();
    });

    $scope.zoomOut = function () {
        // TODO limit max cavas zoom out

        canvasScale = canvasScale / SCALE_FACTOR;

        $scope.canvasScale = canvasScale;

        canvas.setHeight(canvas.getHeight() * (1 / SCALE_FACTOR));
        canvas.setWidth(canvas.getWidth() * (1 / SCALE_FACTOR));

        var objects = canvas.getObjects();
        for (var i in objects) {
            var scaleX = objects[i].scaleX;
            var scaleY = objects[i].scaleY;
            var left = objects[i].left;
            var top = objects[i].top;

            var tempScaleX = scaleX * (1 / SCALE_FACTOR);
            var tempScaleY = scaleY * (1 / SCALE_FACTOR);
            var tempLeft = left * (1 / SCALE_FACTOR);
            var tempTop = top * (1 / SCALE_FACTOR);

            objects[i].scaleX = tempScaleX;
            objects[i].scaleY = tempScaleY;
            objects[i].left = tempLeft;
            objects[i].top = tempTop;

            objects[i].setCoords();
        }

        canvas.renderAll();
    }

    // Reset Zoom
    $scope.resetZoom = function () {

        canvas.setHeight(canvas.getHeight() * (1 / canvasScale));
        canvas.setWidth(canvas.getWidth() * (1 / canvasScale));

        var objects = canvas.getObjects();
        for (var i in objects) {
            var scaleX = objects[i].scaleX;
            var scaleY = objects[i].scaleY;
            var left = objects[i].left;
            var top = objects[i].top;

            var tempScaleX = scaleX * (1 / canvasScale);
            var tempScaleY = scaleY * (1 / canvasScale);
            var tempLeft = left * (1 / canvasScale);
            var tempTop = top * (1 / canvasScale);

            objects[i].scaleX = tempScaleX;
            objects[i].scaleY = tempScaleY;
            objects[i].left = tempLeft;
            objects[i].top = tempTop;

            objects[i].setCoords();
        }

        canvas.renderAll();

        canvasScale = 1;
    }

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



