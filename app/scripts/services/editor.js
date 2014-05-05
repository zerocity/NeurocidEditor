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
            "width": 600000,
            "height": 600000,
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
              "numFriends": 10,
              "numFriendFacilities": 3,
              "numEnemies": 10,
              "numEnemyFacilities": 3,
              "numProjectiles": 10
          },
          "PlacerLayout": {
              "center": [
                  300000,
                  300000
              ],
              "distance": 10000,
              "placer": "placer/opposite",
              "rotation": 0,
              "spacing": 100
          },
          "FacilitiesA": [
              {
                  "radius": 50,
                  "range": 50,
                  "maxCooldown": 5,
                  "loc": [
                      11041,
                      11161
                  ],
                  "rotation": 52.47
              }
          ],
          "FacilitiesB": [
              {
                  "radius": 50,
                  "range": 50,
                  "maxCooldown": 5,
                  "loc": [
                      11041,
                      11161
                  ],
                  "rotation": 52.47
              }
          ],
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
