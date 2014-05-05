'use strict';

angular.module('neurocidEditorApp')
  .factory('Ship', function (canvas) {
    // Service logic
    // ...
    var multiplicator = 100 ;
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
        this.set('propertyId', options.propertyId || 0);
        this.set('teamA', options.teamA || true);

        this.set('isDummy', options.isDummy || false);
        this.set('canShoot', options.canShoot || true);
        this.set('canRotate', options.canRotate || true);
        this.set('canMove', options.canMove || true);
        this.set('disableProjectileFitness', options.disableProjectileFitness || false);

        // float
        this.set('range', options.range || 50.0);
        this.set('maxSpeed', options.maxSpeed || 1.0);
        this.set('maxRotation', options.maxRotation || 1.0);
        this.set('maxFuel', options.maxFuel || 100000.0);
        this.set('fuelRate', options.fuelRate || 1.0);

        // int
        this.set('maxCooldown', options.maxCooldown|| 5);
        this.set('maxAmmo', options.maxAmmo || 5);
        this.set('maxDamage', options.maxDamage || 6);
        this.set('crashesPerDamage', options.crashesPerDamage || 1);
        this.set('numPerfDesc', options.numPerfDesc || 4);

        // new
        this.set("startFuel" , options.startFuel || 1000);
        this.set("hardness" , options.hardness || 100);
        this.set("startammo" , options.startammo || 0);
        this.set("fitnessfunction" , options.fitnessfunction || "amir");

      },

      toObject: function() {
        return fabric.util.object.extend(this.callSuper('toObject'), {
          propertyId : this.get('propertyId'),
          teamA: this.get('teamA'),
          isDummy: this.get('isDummy'),
          canShoot: this.get('canShoot'),
          canRotate: this.get('canRotate'),
          canMove: this.get('canMove'),
          disableProjectileFitness: this.get('disableProjectileFitness'),

          range: this.get('range'),
          maxSpeed: this.get('maxSpeed'),
          maxRotation: this.get('maxRotation'),
          maxFuel: this.get('maxFuel'),
          fuelRate: this.get('fuelRate'),

          maxCooldown: this.get('maxCooldown'),
          maxAmmo: this.get('maxAmmo'),
          maxDamage: this.get('maxDamage'),
          crashesPerDamage: this.get('crashesPerDamage'),
          numPerfDesc: this.get('numPerfDesc'),

          startFuel : this.get('startFuel'),
          hardness : this.get('hardness'),
          startammo : this.get('startammo'),
          fitnessfunction : this.get('fitnessfunction')

        });
      },

      _render: function(ctx) {
        this.callSuper('_render', ctx);
      }
    });

    this.getShips = function(shape) {
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
          //cleaned.loc = [cleaned.left,cleaned.top];
          cleaned.loc = [cleaned.left*multiplicator,cleaned.top*multiplicator]
          cleaned.rotation = cleaned.angle;
          cleaned = _.omit(cleaned,'left','top','angle');
          console.log('test');
          if (cleaned.teamA) {
            cleaned = _.omit(cleaned,'TeamA');
            TeamA.push(cleaned);
          } else {
            cleaned = _.omit(cleaned,'TeamA');
            TeamB.push(cleaned);
          }
      });
      var ships = {'TeamA':TeamA,'TeamB':TeamB};
      return ships;
    }

    this.getCanvas = function() {
        console.log(canvas);
        return canvas
    };

    this.createShip = function (TeamA,posX,posY){
      if (TeamA) {
        var ship = new Ship({left: posX, top: posY});
        PropertyIdCount = PropertyIdCount + 1;
        ship.propertyId =PropertyIdCount
        ship.angle = 90;
        ship.radius = 3;

        data.push(ship);
      } else {
        // Team B
        var ship = new Ship({left: 100 , top: 20 + 20 * canvas.canvasShapes().length });
        PropertyIdCount = PropertyIdCount + 1;
        ship.propertyId = PropertyIdCount
        ship.teamA = false;
        ship.radius = 3;
        ship.fill= 'blue';
        ship.angle = 360 - 90;

        data.push(ship);
      }
      return canvas.set(ship);
    }

    this.getProperties = function(shape) {
      var cleaned = _.omit(shape.toJSON(),'backgroundColor', 'flipX' , 'flipY' , 'height' , 'opacity' , 'originX' , 'originY' , 'scaleX' , 'scaleY' , 'shadow' , 'stroke' , 'strokeDashArray' , 'strokeLineJoin' , 'strokeMiterLimit' , 'type' , 'visible','clipTo', 'fill', 'strokeLineCap', 'strokeWidth', 'width','radius');
      cleaned.loc = [cleaned.left,cleaned.top]
      cleaned.rotation = cleaned.angle
      cleaned = _.omit(cleaned,'left','top')
      return cleaned
    };

    this.exportSenario = function() {
      //var Team = $scope.getShipsJson();
      console.log(Team);
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
        }
      return Senario
    }

    return this

  });