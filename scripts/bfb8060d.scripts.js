"use strict";angular.module("neurocidEditorApp",["ngCookies","ngResource","ngSanitize","ngRoute","xeditable","mgcrea.ngStrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]).run(["editableOptions",function(a){a.theme="bs3"}]),angular.module("neurocidEditorApp").controller("MainCtrl",["$scope","canvas","Editor",function(a,b,c){a.isHidden=!0,a.ship={getShipCount:function(){return b.canvasShapes().length},currentObj:function(){return"undefined"!=typeof b?b.lib.getActiveObject():void 0}},b.initMouseEvent(),a.toggleProperties=function(){a.isHidden=!a.isHidden},a.addShip=function(a){c.addShip(a)},a.addLine=function(a,b){for(var d=0;a>d;d++)c.addShip(b)},a.exportJson=function(){window.open("data:text/json;charset=utf-8,"+escape(JSON.stringify(c.getJson())))},a.canvasShapes=function(){return b.canvasShapes()},a.getProperties=function(){a.properties=c.getShipProperties(this.shape),a.toggleProperties(),c.centerEditor(this.shape,a.properties.loc[1],a.properties.loc[0])}}]).filter("isValue",function(){return function(a,b){return a==b?a:void 0}}).filter("iif",function(){return function(a,b,c){return a?b:c}}),angular.module("neurocidEditorApp").filter("getTypeOfPropertie",function(){return function(a){return typeof a}}),angular.module("neurocidEditorApp").filter("setInputField",["$sce",function(a){return function(b,c){switch(typeof b){case"number":return a.trustAsHtml('<input type="number" name="'+c+'" ng-model="model_'+c+'" value="'+b+'" />');case"boolean":return console.log(c,typeof b),a.trustAsHtml('<label><input type="checkbox" name="'+c+'" ng-model="model_'+c+' value="left" bs-checkbox/> '+c+"</label>");case"object":return a.trustAsHtml("<hr>")}}}]),angular.module("neurocidEditorApp").factory("canvas",function(){{var a=new fabric.Canvas("canvas");new Image}a.backgroundColor=new fabric.Pattern({source:"images/bp.png"}),a.renderAll(),a.setHeight(3e3),a.setWidth(3e3),a.selectionColor="rgba(255,255,255,0.3)",a.selectionDashArray=[10,10],a.selectionBorderColor="blue",a.selectionLineWidth=3,a.allowTouchScrolling=!0,a.renderAll();{var b=document.getElementById("editor");b.clientHeight/2,b.clientWidth/2}b.scrollTop=1500,b.scrollLeft=1500;var c=(new Array,1),d=1.2,e=function(c,d,e,f){c&&(b.scrollLeft=b.scrollLeft-100),e&&(b.scrollTop=b.scrollTop-100),d&&(b.scrollLeft=b.scrollLeft+100),f&&(b.scrollTop=b.scrollTop+100),a.calcOffset()};return{initMouseEvent:function(){a.on("mouse:down",function(a){var c=a.e.layerX-b.scrollLeft<=100,d=a.e.layerX-b.scrollLeft>=b.clientWidth-100,f=a.e.layerY-b.scrollTop<=100,g=a.e.layerY-b.scrollTop>=b.clientHeight-100;(c||d||f||g)&&e(c,d,f,g)})},set:function(b){a.add(b),a.renderAll(),a.calcOffset()},setCanvasScale:function(){c/=d},canvasShapes:function(){return a.getObjects()},setActiveObject:function(b){return a.setActiveObject(b)},calcOffset:function(){return a.calcOffset()},renderAll:function(){return a.renderAll()},toJSON:function(){return a.toJSON()}}}),angular.module("neurocidEditorApp").factory("Ship",["canvas",function(a){var b=1,c=0,d=[],e=fabric.util.createClass(fabric.Circle,{type:"ship",initialize:function(a){a||(a={}),this.callSuper("initialize",a),this.set({_controlsVisibility:{bl:!1,br:!1,mb:!1,ml:!1,mr:!1,mt:!1,mtr:!0,tl:!1,tr:!1},lockScalingY:!0,lockScalingX:!0,lockUniScaling:!0,padding:5,radius:3,fill:"red"}),this.set("PropertyId",a.PropertyId||0),this.set("TeamA",a.IsDummy||!0),this.set("IsDummy",a.IsDummy||!1),this.set("CanShoot",a.CanShoot||!0),this.set("CanRotate",a.CanRotate||!0),this.set("CanMove",a.CanMove||!0),this.set("DisableProjectileFitness",a.DisableProjectileFitness||!1),this.set("Range",a.Range||50),this.set("MaxSpeed",a.MaxSpeed||1),this.set("MaxRotation",a.MaxRotation||1),this.set("MaxFuel",a.MaxFuel||1e4),this.set("FuelRate",a.FuelRate||1),this.set("MaxCooldown",a.MaxCooldown||5),this.set("MaxAmmo",a.MaxAmmo||5),this.set("MaxDamage",a.MaxDamage||6),this.set("CrashesPerDamage",a.CrashesPerDamage||1),this.set("NumPerfDesc",a.NumPerfDesc||4)},toObject:function(){return fabric.util.object.extend(this.callSuper("toObject"),{PropertyId:this.get("PropertyId"),TeamA:this.get("TeamA"),IsDummy:this.get("IsDummy"),CanShoot:this.get("CanShoot"),CanRotate:this.get("CanRotate"),CanMove:this.get("CanMove"),DisableProjectileFitness:this.get("DisableProjectileFitness"),Range:this.get("Range"),MaxSpeed:this.get("MaxSpeed"),MaxRotation:this.get("MaxRotation"),MaxFuel:this.get("MaxFuel"),FuelRate:this.get("FuelRate"),MaxCooldown:this.get("MaxCooldown"),MaxAmmo:this.get("MaxAmmo"),MaxDamage:this.get("MaxDamage"),CrashesPerDamage:this.get("CrashesPerDamage"),NumPerfDesc:this.get("NumPerfDesc")})},_render:function(a){this.callSuper("_render",a)}});return{getCanvas:function(){return console.log(a),a},createShip:function(b,f,g){if(b){var h=new e({left:f,top:g});c+=1,h.PropertyId=c,h.angle=90,h.radius=3,d.push(h)}else{var h=new e({left:100,top:20+20*a.canvasShapes().length});c+=1,h.PropertyId=c,h.TeamA=!1,h.radius=3,h.fill="blue",h.angle=270,d.push(h)}return a.set(h)},getProperties:function(a){var c=_.omit(a.toJSON(),"backgroundColor","flipX","flipY","height","opacity","originX","originY","scaleX","scaleY","shadow","stroke","strokeDashArray","strokeLineJoin","strokeMiterLimit","type","visible","clipTo","fill","strokeLineCap","strokeWidth","width","radius");return c.loc=[c.left*b,c.top*b],c.rotation=c.angle,c=_.omit(c,"left","top")},getShips:function(){var c=_.omit(a.toJSON(),"background"),d=[],e=[];_.each(c.objects,function(a){var c=_.omit(a,"backgroundColor","flipX","flipY","height","opacity","originX","originY","scaleX","scaleY","shadow","stroke","strokeDashArray","strokeLineJoin","strokeMiterLimit","type","visible","clipTo","fill","strokeLineCap","strokeWidth","width","radius");c.loc=[c.left*b,c.top*b],c.rotation=c.angle,c=_.omit(c,"left","top","angle"),c.TeamA?(c=_.omit(c,"TeamA"),d.push(c)):(c=_.omit(c,"TeamA"),e.push(c))});var f={TeamA:d,TeamB:e};return f},exportSenario:function(){var a=$scope.getShipsJson(),b={BattleFieldLayout:{width:3e5,height:3e5,iterations:1500},PhysicsLayout:{gravity:[0,0],timeStep:.033,positionIterations:2,velocityIterations:6,coordToMetersFactor:.03},ScannerLayout:{disableClusterCenters:!0,numClusters:3,numFriends:20,numEnemies:20,numProjectiles:20},TeamA:a.TeamA,TeamB:a.TeamB};return console.log(b),b}}}]),angular.module("neurocidEditorApp").factory("Editor",["canvas","Ship",function(a,b){var c={getShipProperties:function(a){return b.getProperties(a)},centerEditor:function(b,c,d){var e=document.getElementById("editor"),f=e.clientHeight/2,g=e.clientWidth/2;e.scrollTop=c-f,e.scrollLeft=d-g,a.setActiveObject(b),a.calcOffset()},addShip:function(a){var c=document.getElementById("editor"),d=c.clientHeight/2,e=c.clientWidth/2;b.createShip(a,c.scrollLeft+e,c.scrollTop+d)},getJson:function(){var a=b.getShips(),c={BattleFieldLayout:{width:3e5,height:3e5,iterations:1500},PhysicsLayout:{gravity:[0,0],timeStep:.033,positionIterations:2,velocityIterations:6,coordToMetersFactor:.03},ScannerLayout:{disableClusterCenters:!0,numClusters:3,numFriends:20,numEnemies:20,numProjectiles:20},TeamA:a.TeamA,TeamB:a.TeamB};return console.log(c),c}};return c}]);