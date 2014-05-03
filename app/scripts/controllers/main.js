'use strict';

angular.module('neurocidEditorApp')
  .controller('MainCtrl', function ($scope,canvas,Ship) {
    $scope.isHidden = true ;

    // set pos in canvas
    var editorDiv = document.getElementById('editor');
    editorDiv.scrollTop = 1500;
    editorDiv.scrollLeft = 1500;

    var centerEditorY = editorDiv.clientHeight / 2
    var centerEditorX = editorDiv.clientWidth / 2

    var setCanvasScroll = function(lx,rx,ly,ry) {
      if (lx) {
        editorDiv.scrollLeft = editorDiv.scrollLeft - 100;
        //console.log('can move lx',lx);
      }

      if (ly) {
        editorDiv.scrollTop = editorDiv.scrollTop - 100;
        //console.log('can move ly',ly);
      }

      if (rx) {
        editorDiv.scrollLeft = editorDiv.scrollLeft + 100;
        //console.log('can move rx',rx);
      }

      if (ry) {
        editorDiv.scrollTop = editorDiv.scrollTop + 100;
        //console.log('can move ry',ry);
      }
    }

    canvas.getFabric().on('mouse:down', function(o) {
      var lx = (o.e.layerX-editorDiv.scrollLeft <= 100), // left x
          rx = (o.e.layerX-editorDiv.scrollLeft >= editorDiv.clientWidth-100), // right x
          ly = o.e.layerY-editorDiv.scrollTop <= 100, // left y
          ry = o.e.layerY-editorDiv.scrollTop >= editorDiv.clientHeight-100; // right y

        if (lx || rx || ly || ry) {
          setCanvasScroll(lx,rx,ly,ry)
        }
    });

    $scope.toggleProperties = function() {
      $scope.isHidden = !$scope.isHidden;
    }

    $scope.addShip = function(TeamA) {
      Ship.createShip(TeamA,editorDiv.scrollLeft + centerEditorX  ,editorDiv.scrollTop + centerEditorY );
    };

    $scope.addLine = function(num,TeamA) {
      for (var i = 0; i < num; i++) {
        Ship.createShip(TeamA);
      };
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

      // set scoll pos  on selected shape
      editorDiv.scrollTop = $scope.properties.loc[1] - centerEditorY // top
      editorDiv.scrollLeft = $scope.properties.loc[0] - centerEditorX // left

      // set focus on selected shape
      canvas.setActiveObject(this.shape);
      $scope.toggleProperties();

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



