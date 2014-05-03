'use strict';

angular.module('neurocidEditorApp')
  .factory('Ship', function (canvas) {
    // Service logic
    // ...
    var multiplicator = 1 ;
    var PropertyIdCount = 0;
    var data = []


    var Ship = fabric.util.createClass(fabric.Circle, {

      type: 'ship',

      initialize: function(options) {
        options || (options = { });

        this.callSuper('initialize', options);
        //change fabric defaults properties
        this.set({
          _controlsVisibility :{// disable scaling controll boxes
            bl: false,
            br: false,
            mb: false,
            ml: false,
            mr: false,
            mt: false,
            mtr: true,
            tl: false,
            tr: false,
          },
          lockScalingY :true, // disable scaling y
          lockScalingX :true, // disable scaling x
          lockUniScaling: true,
          padding:5, // padding to selection box
          radius: 3,
          fill: 'red'
        });
        // Neurocid default properties
        this.set('PropertyId', options.PropertyId || 0);
        this.set('TeamA', options.IsDummy || true);
        this.set('IsDummy', options.IsDummy || false);
        this.set('CanShoot', options.CanShoot || true);
        this.set('CanRotate', options.CanRotate || true);
        this.set('CanMove', options.CanMove || true);
        this.set('DisableProjectileFitness', options.DisableProjectileFitness || false);

        // float
        this.set('Range', options.Range || 50.0);
        this.set('MaxSpeed', options.MaxSpeed || 1.0);
        this.set('MaxRotation', options.MaxRotation || 1.0);
        this.set('MaxFuel', options.MaxFuel || 10000.0);
        this.set('FuelRate', options.FuelRate || 1.0);

        // int
        this.set('MaxCooldown', options.MaxCooldown|| 5);
        this.set('MaxAmmo', options.MaxAmmo || 5);
        this.set('MaxDamage', options.MaxDamage || 6);
        this.set('CrashesPerDamage', options.CrashesPerDamage || 1);
        this.set('NumPerfDesc', options.NumPerfDesc || 4);

      },

      toObject: function() {
        return fabric.util.object.extend(this.callSuper('toObject'), {
          PropertyId : this.get('PropertyId'),
          TeamA: this.get('TeamA'),
          IsDummy: this.get('IsDummy'),
          CanShoot: this.get('CanShoot'),
          CanRotate: this.get('CanRotate'),
          CanMove: this.get('CanMove'),
          DisableProjectileFitness: this.get('DisableProjectileFitness'),

          Range: this.get('Range'),
          MaxSpeed: this.get('MaxSpeed'),
          MaxRotation: this.get('MaxRotation'),
          MaxFuel: this.get('MaxFuel'),
          FuelRate: this.get('FuelRate'),

          MaxCooldown: this.get('MaxCooldown'),
          MaxAmmo: this.get('MaxAmmo'),
          MaxDamage: this.get('MaxDamage'),
          CrashesPerDamage: this.get('CrashesPerDamage'),
          NumPerfDesc: this.get('NumPerfDesc')

        });
      },

      _render: function(ctx) {
        this.callSuper('_render', ctx);
      }
    });

    // Public API here
    return {
      getCanvas : function() {
        console.log(canvas);
        return canvas
      },
      createShip: function (TeamA,posX,posY){
        if (TeamA) {
          var ship = new Ship({left: posX, top: posY});
          PropertyIdCount = PropertyIdCount + 1;
          ship.PropertyId =PropertyIdCount
          ship.angle = 90;
          ship.radius = 3 * canvas.getCanvasScale()
          data.push(ship);
        } else {
          // Team B
          var ship = new Ship({left: 100 , top: 20 + 20 * canvas.canvasShapes().length });
          PropertyIdCount = PropertyIdCount + 1;
          ship.PropertyId =PropertyIdCount
          ship.TeamA = false;
          ship.radius = 3 * canvas.getCanvasScale()
          ship.fill= 'blue';
          ship.angle = 360 - 90;
          data.push(ship);
        }
        return canvas.set(ship);
      },
      getProperties: function(shape) {
        console.log(shape);
         var cleaned = _.omit(shape.toJSON(),'backgroundColor', 'flipX' , 'flipY' , 'height' , 'opacity' , 'originX' , 'originY' , 'scaleX' , 'scaleY' , 'shadow' , 'stroke' , 'strokeDashArray' , 'strokeLineJoin' , 'strokeMiterLimit' , 'type' , 'visible','clipTo', 'fill', 'strokeLineCap', 'strokeWidth', 'width','radius');
        cleaned.loc = [cleaned.left*multiplicator,cleaned.top*multiplicator]
        cleaned.rotation = cleaned.angle
        cleaned = _.omit(cleaned,'left','top')
        return cleaned
      },
      getShips:function(shape) {
        var global = _.omit(canvas.toJSON(),'background'),
            TeamA = [],
            TeamB = [];
        _.each(global['objects'],function (ship){
             var cleaned = _.omit(ship,'backgroundColor',
              'flipX' , 'flipY',
              'height' , 'opacity',
              'originX' , 'originY',
              'scaleX' , 'scaleY' ,
              'shadow' , 'stroke' , 'strokeDashArray' , 'strokeLineJoin' , 'strokeMiterLimit' , 'type' , 'visible','clipTo', 'fill', 'strokeLineCap', 'strokeWidth', 'width','radius');
            cleaned.loc = [cleaned.left*multiplicator,cleaned.top*multiplicator];
            cleaned.rotation = cleaned.angle;
            cleaned = _.omit(cleaned,'left','top','angle');

            if (cleaned.TeamA) {
              cleaned = _.omit(cleaned,'TeamA');
              TeamA.push(cleaned);
            } else {
              cleaned = _.omit(cleaned,'TeamA');
              TeamB.push(cleaned);
            }
        });
        var ships = {'TeamA':TeamA,'TeamB':TeamB};
        return ships;
      },
      exportSenario:function() {
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
      }
    };
  });
