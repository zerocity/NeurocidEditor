"use strict";angular.module("neurocidEditorApp",["ngSanitize","ngRoute","xeditable"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]).run(["editableOptions",function(a){a.theme="default"}]),angular.module("neurocidEditorApp").controller("MainCtrl",["$scope","canvas","Editor","$timeout","Ship",function(a,b,c,d,e){a.isHidden=!0,$(document).mousemove(function(b){a.currentMousePosX=b.pageX-$("#editor").offset().left+$("#editor").scrollLeft(),a.currentMousePosY=b.pageY-$("#editor").offset().top+$("#editor").scrollTop()}),a.keyPress=function(c){switch(console.log(c.which),c.which){case 83:console.log("newShip TeamA"),e.createShip(!0,a.currentMousePosX,a.currentMousePosY);break;case 65:console.log("new Facilities TeamA"),e.createFacilities(!0,a.currentMousePosX,a.currentMousePosY);break;case 87:console.log("newShip TeamB"),e.createShip(!1,a.currentMousePosX,a.currentMousePosY);break;case 81:console.log("new Facilities TeamB"),e.createFacilities(!1,a.currentMousePosX,a.currentMousePosY);break;case 46:console.log("deleat entry"),b.remove(b.getActiveObject())}},a.ship={getShipCount:function(){return b.canvasShapes().length},currentObj:function(){return"undefined"!=typeof b?b.lib.getActiveObject():void 0}},d(function(){var a=document.getElementById("editor");a.scrollLeft=1500,a.scrollTop=1500,c.addShip(!0)}),b.initMouseEvent(),a.toggleProperties=function(){a.isHidden=!a.isHidden},a.addShip=function(a){c.addShip(a)},a.getFacilities=function(){e.getFacilities()},a.addFacilities=function(a){c.addFacilities(a)},a.addLine=function(a,b){for(var d=0;a>d;d++)c.addShip(b)},a.exportJson=function(){var a=document.getElementById("jsonexport"),b=window.btoa(JSON.stringify(c.getJson()));a.download="schema.nej",a.href="data:text/json;base64,"+b},a.canvasShapes=function(){return b.canvasShapes()},a.getProperties=function(){a.properties=c.getShipProperties(this.shape),a.toggleProperties(),c.centerEditor(this.shape,a.properties.loc[1],a.properties.loc[0])},a.removeEntry=function(){console.log(this.shape),b.remove(this.shape)}}]).filter("isValue",function(){return function(a,b){return a==b?a:void 0}}).filter("iif",function(){return function(a,b,c){return a?b:c}}).directive("resize",["$window",function(a){return function(b){var c=angular.element(a);b.$watch(function(){return{h:c.height(),w:c.width()}},function(a){b.windowHeight=a.h,b.windowWidth=a.w,b.style=function(){return{height:a.h-75+"px"}}},!0),c.bind("resize",function(){b.$apply()})}}]),angular.module("neurocidEditorApp").filter("getTypeOfPropertie",function(){return function(a){return typeof a}}),angular.module("neurocidEditorApp").filter("setInputField",["$sce",function(a){return function(b,c){switch(typeof b){case"number":return a.trustAsHtml('<input type="number" name="'+c+'" ng-model="model_'+c+'" value="'+b+'" />');case"boolean":return console.log(c,typeof b),a.trustAsHtml('<label><input type="checkbox" name="'+c+'" ng-model="model_'+c+' value="left" bs-checkbox/> '+c+"</label>");case"object":return a.trustAsHtml("<hr>")}}}]),angular.module("neurocidEditorApp").factory("canvas",function(){{var a=new fabric.Canvas("canvas");new Image}a.backgroundColor=new fabric.Pattern({source:"images/bp.png"}),a.renderAll(),a.setHeight(3e3),a.setWidth(3e3),a.selectionColor="rgba(255,255,255,0.3)",a.selectionDashArray=[10,10],a.selectionBorderColor="blue",a.selectionLineWidth=3,a.allowTouchScrolling=!0,a.renderAll();var b=document.getElementById("editor"),c=(b.clientHeight/2,b.clientWidth/2,new Array,1),d=1.2,e=function(c,d,e,f){c&&(b.scrollLeft=b.scrollLeft-100),e&&(b.scrollTop=b.scrollTop-100),d&&(b.scrollLeft=b.scrollLeft+100),f&&(b.scrollTop=b.scrollTop+100),a.calcOffset()};return{initMouseEvent:function(){a.on("mouse:down",function(a){var c=a.e.layerX-b.scrollLeft<=100,d=a.e.layerX-b.scrollLeft>=b.clientWidth-100,f=a.e.layerY-b.scrollTop<=100,g=a.e.layerY-b.scrollTop>=b.clientHeight-100;(c||d||f||g)&&e(c,d,f,g)})},set:function(b){a.add(b),a.renderAll(),a.calcOffset()},remove:function(b){a.remove(b)},setCanvasScale:function(){c/=d},canvasShapes:function(){return a.getObjects()},setActiveObject:function(b){return a.setActiveObject(b)},getActiveObject:function(){return a.getActiveObject()},calcOffset:function(){return a.calcOffset()},renderAll:function(){return a.renderAll()},toJSON:function(){return a.toJSON()}}}),angular.module("neurocidEditorApp").factory("Ship",["canvas",function(a){var b=100,c=0,d=[],e=fabric.util.createClass(fabric.Circle,{type:"ship",initialize:function(a){a||(a={}),this.callSuper("initialize",a),this.set({_controlsVisibility:{bl:!1,br:!1,mb:!1,ml:!1,mr:!1,mt:!1,mtr:!0,tl:!1,tr:!1},lockScalingY:!0,lockScalingX:!0,lockUniScaling:!0,padding:5,radius:3,fill:"red"}),this.set("propertyId",a.propertyId||0),this.set("teamA",a.teamA||!0),this.set("isDummy",a.isDummy||!1),this.set("canShoot",a.canShoot||!0),this.set("canRotate",a.canRotate||!0),this.set("canMove",a.canMove||!0),this.set("disableProjectileFitness",a.disableProjectileFitness||!1),this.set("range",a.range||50),this.set("maxSpeed",a.maxSpeed||1),this.set("maxRotation",a.maxRotation||1),this.set("maxFuel",a.maxFuel||1e5),this.set("fuelRate",a.fuelRate||1),this.set("maxCooldown",a.maxCooldown||5),this.set("maxAmmo",a.maxAmmo||5),this.set("maxDamage",a.maxDamage||6),this.set("crashesPerDamage",a.crashesPerDamage||1),this.set("numPerfDesc",a.numPerfDesc||4),this.set("startFuel",a.startFuel||1e3),this.set("hardness",a.hardness||100),this.set("startAmmo",a.startAmmo||0),this.set("fitnessFunction",a.fitnessFunction||"fitness/amir")},toObject:function(){return fabric.util.object.extend(this.callSuper("toObject"),{propertyId:this.get("propertyId"),teamA:this.get("teamA"),isDummy:this.get("isDummy"),canShoot:this.get("canShoot"),canRotate:this.get("canRotate"),canMove:this.get("canMove"),disableProjectileFitness:this.get("disableProjectileFitness"),range:this.get("range"),maxSpeed:this.get("maxSpeed"),maxRotation:this.get("maxRotation"),maxFuel:this.get("maxFuel"),fuelRate:this.get("fuelRate"),maxCooldown:this.get("maxCooldown"),maxAmmo:this.get("maxAmmo"),maxDamage:this.get("maxDamage"),crashesPerDamage:this.get("crashesPerDamage"),numPerfDesc:this.get("numPerfDesc"),startFuel:this.get("startFuel"),hardness:this.get("hardness"),startAmmo:this.get("startAmmo"),fitnessFunction:this.get("fitnessFunction")})},_render:function(a){this.callSuper("_render",a)}}),f=fabric.util.createClass(fabric.Circle,{type:"Facilities",initialize:function(a){a||(a={}),this.callSuper("initialize",a),this.set({_controlsVisibility:{bl:!1,br:!1,mb:!1,ml:!1,mr:!1,mt:!1,mtr:!0,tl:!1,tr:!1},lockScalingY:!0,lockScalingX:!0,lockUniScaling:!0,padding:5,radius:15,fill:"#FBFF7F"}),this.set("propertyId",a.propertyId||0),this.set("teamA",a.teamA||!0),this.set("maxCooldown",a.maxCooldown||500)},toObject:function(){return fabric.util.object.extend(this.callSuper("toObject"),{propertyId:this.get("propertyId"),teamA:this.get("teamA"),maxCooldown:this.get("maxCooldown")})},_render:function(a){this.callSuper("_render",a)}});return this.getFacilities=function(){var b=_.omit(a.toJSON(),"background");console.log(b)},this.getShips=function(){var c=_.omit(a.toJSON(),"background"),d=[],e=[],f=[],g=[];_.each(c.objects,function(a){var c=_.omit(a,"backgroundColor","flipX","flipY","height","opacity","originX","originY","scaleX","scaleY","shadow","stroke","strokeDashArray","strokeLineJoin","strokeMiterLimit","visible","clipTo","fill","strokeLineCap","strokeWidth","width","radius");"ship"===a.type&&(c.loc=[c.left*b,c.top*b],c.rotation=c.angle*(Math.PI/180),c.radius=50,c=_.omit(c,"left","top","angle","type"),c.teamA?(c=_.omit(c,"teamA"),d.push(c)):(c=_.omit(c,"teamA"),e.push(c))),"Facilities"===a.type&&(c.loc=[c.left*b,c.top*b],c.rotation=c.angle*(Math.PI/180),c.radius=6e3,c=_.omit(c,"left","top","angle","type"),c.teamA?(c=_.omit(c,"teamA"),f.push(c)):(c=_.omit(c,"teamA"),g.push(c)))});var h={TeamA:d,TeamB:e,FacilitiesA:f,FacilitiesB:g};return h},this.getCanvas=function(){return console.log(a),a},this.createShip=function(b,f,g){var h=new e({left:f,top:g});return c+=1,h.propertyId=c,h.angle=90,h.radius=3,h.fill="red",b||(h.teamA=!1,h.fill="blue",h.angle=270),d.push(h),a.set(h)},this.createFacilities=function(b,e,g){var h=new f({left:e,top:g});return c+=1,h.propertyId=c,h.angle=90,h.radius=15,h.fill="red",b||(h.fill="blue",h.teamA=!1,h.angle=270),d.push(h),a.set(h)},this.getProperties=function(a){var b=_.omit(a.toJSON(),"backgroundColor","flipX","flipY","height","opacity","originX","originY","scaleX","scaleY","shadow","stroke","strokeDashArray","strokeLineJoin","strokeMiterLimit","visible","clipTo","fill","strokeLineCap","strokeWidth","width","radius");return b.loc=[b.left,b.top],b.rotation=b.angle,b=_.omit(b,"left","top")},this.exportSenario=function(){console.warn("!!!! Isnt the corret layout Team");var a={BattleFieldLayout:{width:3e5,height:3e5,iterations:1500},PhysicsLayout:{gravity:[0,0],timeStep:.033,positionIterations:2,velocityIterations:6,coordToMetersFactor:.03},ScannerLayout:{disableClusterCenters:!0,numClusters:3,numFriends:20,numEnemies:20,numProjectiles:20},TeamA:Team.TeamA,TeamB:Team.TeamB};return a},this}]),angular.module("neurocidEditorApp").factory("Editor",["canvas","Ship",function(a,b){var c={getShipProperties:function(a){return b.getProperties(a)},centerEditor:function(b,c,d){var e=document.getElementById("editor"),f=e.clientHeight/2,g=e.clientWidth/2;e.scrollTop=c-f,e.scrollLeft=d-g,a.setActiveObject(b),a.calcOffset()},addShip:function(a){var c=document.getElementById("editor"),d=c.clientHeight/2,e=c.clientWidth/2;b.createShip(a,c.scrollLeft+e,c.scrollTop+d)},addFacilities:function(a){var c=document.getElementById("editor"),d=c.clientHeight/2,e=c.clientWidth/2;b.createFacilities(a,c.scrollLeft+e,c.scrollTop+d)},getJson:function(){var a=b.getShips(),c={BattleFieldLayout:{width:6e5,height:6e5,iterations:1500},PhysicsLayout:{gravity:[0,0],timeStep:.033,positionIterations:2,velocityIterations:6,coordToMetersFactor:.03},ScannerLayout:{disableClusterCenters:!0,numClusters:3,numFriends:10,numFriendFacilities:3,numEnemies:10,numEnemyFacilities:3,numProjectiles:10},PlacerLayout:{center:[3e5,3e5],distance:1e4,placer:"placer/fuzzer",fuzz:4,rotation:0,spacing:100},TeamA:a.TeamA,TeamB:a.TeamB,FacilitiesA:a.FacilitiesA,FacilitiesB:a.FacilitiesB};return c}};return c}]);