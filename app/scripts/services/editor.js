'use strict';

angular.module('neurocidEditorApp')
  .factory('Editor', function (canvas,Ship) {
    var Editor = {
      getShipProperties : function(shape) {
        return Ship.getProperties(shape);
      },
      centerEditor: function(shape,posY,posX) {
        var editorDiv = document.getElementById('editor');
        var centerEditorY = editorDiv.clientHeight / 2
        var centerEditorX = editorDiv.clientWidth / 2
        editorDiv.scrollTop = posY - centerEditorY // top
        editorDiv.scrollLeft = posX - centerEditorX // left

        canvas.setActiveObject(shape);
        canvas.calcOffset();
      },
      addShip : function(TeamA) {
        var editorDiv = document.getElementById('editor');
        var centerEditorY = editorDiv.clientHeight / 2
        var centerEditorX = editorDiv.clientWidth / 2
        Ship.createShip(TeamA,editorDiv.scrollLeft + centerEditorX  ,editorDiv.scrollTop + centerEditorY );
      },
      getJson : function (){
      //return console.log(JSON.stringify(canvas.objects.toJSON()));
      //return Ship.getShips();
      var Team = Ship.getShips()
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
      }
    }

    // Public API here
    return Editor;
  });
