"use strict";angular.module("neurocidEditorApp",["ngCookies","ngResource","ngSanitize","ngRoute","xeditable","mgcrea.ngStrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("neurocidEditorApp").controller("MainCtrl",["$scope","canvas","Ship",function(a,b,c){a.canvasScale=b.getCanvasScale(),a.addShip=function(a){c.createShip(a)},a.addLine=function(a){for(var d=[],e=0;a>e;e++){var f=new c({left:20,top:20*e});d.push(f)}var g=new fabric.Group(d,{left:20,top:20});b.add(g)},a.getShipsJson=function(){return c.getShips()},a.getJson=function(){var b=a.getShipsJson(),c={BattleFieldLayout:{width:3e5,height:3e5,iterations:1500},PhysicsLayout:{gravity:[0,0],timeStep:.033,positionIterations:2,velocityIterations:6,coordToMetersFactor:.03},ScannerLayout:{disableClusterCenters:!0,numClusters:3,numFriends:20,numEnemies:20,numProjectiles:20},TeamA:b.TeamA,TeamB:b.TeamB};return console.log(c),c},a.exportJson=function(){JSON.stringify(a.getJson());window.open("data:text/json;charset=utf-8,"+escape(JSON.stringify(a.getJson())))},a.canvasShapes=function(){return b.canvasShapes()},a.selectShape=function(){b.setActiveObject(this.shape)},a.getProperties=function(){a.properties=c.getProperties(this.shape),b.setActiveObject(this.shape),$(".properties").toggleClass("hide"),b.calcOffset()},a.setProperties=function(){console.log(b.getActiveObject())},a.currentShape=function(){return"undefined"!=typeof b?b.lib.getActiveObject():void 0},fabric.util.addListener(document.getElementById("editor"),"scroll",function(){console.log("scroll"),b.calcOffset()}),a.zoomOut=function(){canvasScale/=SCALE_FACTOR,a.canvasScale=canvasScale,b.setHeight(b.getHeight()*(1/SCALE_FACTOR)),b.setWidth(b.getWidth()*(1/SCALE_FACTOR));var c=b.getObjects();for(var d in c){var e=c[d].scaleX,f=c[d].scaleY,g=c[d].left,h=c[d].top,i=e*(1/SCALE_FACTOR),j=f*(1/SCALE_FACTOR),k=g*(1/SCALE_FACTOR),l=h*(1/SCALE_FACTOR);c[d].scaleX=i,c[d].scaleY=j,c[d].left=k,c[d].top=l,c[d].setCoords()}b.renderAll()},a.resetZoom=function(){b.setHeight(b.getHeight()*(1/canvasScale)),b.setWidth(b.getWidth()*(1/canvasScale));var a=b.getObjects();for(var c in a){var d=a[c].scaleX,e=a[c].scaleY,f=a[c].left,g=a[c].top,h=d*(1/canvasScale),i=e*(1/canvasScale),j=f*(1/canvasScale),k=g*(1/canvasScale);a[c].scaleX=h,a[c].scaleY=i,a[c].left=j,a[c].top=k,a[c].setCoords()}b.renderAll(),canvasScale=1}}]).filter("isValue",function(){return function(a,b){return a==b?a:void 0}}).filter("iif",function(){return function(a,b,c){return a?b:c}}),angular.module("neurocidEditorApp").filter("getTypeOfPropertie",function(){return function(a){return typeof a}}),angular.module("neurocidEditorApp").filter("setInputField",["$sce",function(a){return function(b,c){switch(typeof b){case"number":return a.trustAsHtml('<input type="number" name="'+c+'" ng-model="model_'+c+'" value="'+b+'" />');case"boolean":return console.log(c,typeof b),a.trustAsHtml('<label><input type="checkbox" name="'+c+'" ng-model="model_'+c+' value="left" bs-checkbox/> '+c+"</label>");case"object":return a.trustAsHtml("<hr>")}}}]),angular.module("neurocidEditorApp").factory("canvas",function(){var a;a=new fabric.Canvas("canvas"),a.setHeight(3e3),a.setWidth(3e3),a.backgroundColor="#000000",a.selectionColor="rgba(255,255,255,0.3)",a.selectionDashArray=[10,10],a.selectionBorderColor="blue",a.selectionLineWidth=3,a.allowTouchScrolling=!0,a.renderAll();var b=(new Array,1),c=1.2;return{set:function(b){a.add(b),a.renderAll(),a.calcOffset()},setCanvasSCale:function(){b/=c},getCanvasScale:function(){return b/c},canvasShapes:function(){return a.getObjects()},setActiveObject:function(b){return a.setActiveObject(b)},calcOffset:function(){return a.calcOffset()},renderAll:function(){return a.renderAll()},toJSON:function(){return a.toJSON()}}}),angular.module("neurocidEditorApp").factory("Ship",["canvas",function(a){var b=fabric.util.createClass(fabric.Circle,{type:"ship",initialize:function(a){a||(a={}),this.callSuper("initialize",a),this.set({_controlsVisibility:{bl:!1,br:!1,mb:!1,ml:!1,mr:!1,mt:!1,mtr:!0,tl:!1,tr:!1},lockScalingY:!0,lockScalingX:!0,lockUniScaling:!0,padding:5,radius:3,fill:"red"}),this.set("TeamA",a.IsDummy||!0),this.set("IsDummy",a.IsDummy||!1),this.set("CanShoot",a.CanShoot||!0),this.set("CanRotate",a.CanRotate||!0),this.set("CanMove",a.CanMove||!0),this.set("DisableProjectileFitness",a.DisableProjectileFitness||!1),this.set("Range",a.Range||50),this.set("MaxSpeed",a.MaxSpeed||1),this.set("MaxRotation",a.MaxRotation||1),this.set("MaxFuel",a.MaxFuel||1e4),this.set("FuelRate",a.FuelRate||1),this.set("MaxCooldown",a.MaxCooldown||5),this.set("MaxAmmo",a.MaxAmmo||5),this.set("MaxDamage",a.MaxDamage||6),this.set("CrashesPerDamage",a.CrashesPerDamage||1),this.set("NumPerfDesc",a.NumPerfDesc||4)},toObject:function(){return fabric.util.object.extend(this.callSuper("toObject"),{TeamA:this.get("TeamA"),IsDummy:this.get("IsDummy"),CanShoot:this.get("CanShoot"),CanRotate:this.get("CanRotate"),CanMove:this.get("CanMove"),DisableProjectileFitness:this.get("DisableProjectileFitness"),Range:this.get("Range"),MaxSpeed:this.get("MaxSpeed"),MaxRotation:this.get("MaxRotation"),MaxFuel:this.get("MaxFuel"),FuelRate:this.get("FuelRate"),MaxCooldown:this.get("MaxCooldown"),MaxAmmo:this.get("MaxAmmo"),MaxDamage:this.get("MaxDamage"),CrashesPerDamage:this.get("CrashesPerDamage"),NumPerfDesc:this.get("NumPerfDesc")})},_render:function(a){this.callSuper("_render",a)}});return{createShip:function(c){if(c){var d=new b({left:50,top:20+20*a.canvasShapes().length});d.angle=90,d.radius=3*a.getCanvasScale()}else{var d=new b({left:100,top:20+20*a.canvasShapes().length});d.TeamA=!1,d.radius=3*a.getCanvasScale(),d.fill="blue",d.angle=270}return a.set(d)},getProperties:function(a){var b=_.omit(a.toJSON(),"backgroundColor","flipX","flipY","height","opacity","originX","originY","scaleX","scaleY","shadow","stroke","strokeDashArray","strokeLineJoin","strokeMiterLimit","type","visible","clipTo","fill","strokeLineCap","strokeWidth","width","radius");return b.loc=[100*b.left,100*b.top],b.rotation=b.angle,b=_.omit(b,"left","top")},getShips:function(){var b=_.omit(a.toJSON(),"background"),c=[],d=[];_.each(b.objects,function(a){var b=_.omit(a,"backgroundColor","flipX","flipY","height","opacity","originX","originY","scaleX","scaleY","shadow","stroke","strokeDashArray","strokeLineJoin","strokeMiterLimit","type","visible","clipTo","fill","strokeLineCap","strokeWidth","width","radius");b.loc=[100*b.left,100*b.top],b.rotation=b.angle,b=_.omit(b,"left","top","angle"),b.TeamA?(b=_.omit(b,"TeamA"),c.push(b)):(b=_.omit(b,"TeamA"),d.push(b))});var e={TeamA:c,TeamB:d};return e},exportSenario:function(){var a=$scope.getShipsJson(),b={BattleFieldLayout:{width:3e5,height:3e5,iterations:1500},PhysicsLayout:{gravity:[0,0],timeStep:.033,positionIterations:2,velocityIterations:6,coordToMetersFactor:.03},ScannerLayout:{disableClusterCenters:!0,numClusters:3,numFriends:20,numEnemies:20,numProjectiles:20},TeamA:a.TeamA,TeamB:a.TeamB};return console.log(b),b}}}]);