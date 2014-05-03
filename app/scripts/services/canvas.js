'use strict';

angular.module('neurocidEditorApp')
  .factory('canvas', function () {
    // Service logic
    // ...
    var canvas;
    canvas = new fabric.Canvas('canvas');
    canvas.setHeight(3000);
    canvas.setWidth(3000);
    canvas.backgroundColor = '#000000';
    canvas.selectionColor = 'rgba(255,255,255,0.3)';
    canvas.selectionDashArray = [10,10];
    canvas.selectionBorderColor = 'blue';
    canvas.selectionLineWidth = 3;
    canvas.allowTouchScrolling = true;
    canvas.renderAll();

    var copiedObject;
    var copiedObjects = new Array();
    var canvasScale = 1;
    var SCALE_FACTOR = 1.2;

    // Public API here
    return {
      getFabric : function() {
        return canvas
      },
      set : function(object) {
        canvas.add(object);
        canvas.renderAll();
        canvas.calcOffset();
      },
      setCanvasScale : function () {
        canvasScale = canvasScale / SCALE_FACTOR
      },
      getScaleFactor : function() {
        return SCALE_FACTOR
      },
      getCanvasScale : function () {
        return canvasScale / SCALE_FACTOR
      },
      canvasShapes : function () {
        return canvas.getObjects();
      },
      setActiveObject :function(shape) {
        return canvas.setActiveObject(shape);
      },
      calcOffset : function() {
        return canvas.calcOffset();
      },
      renderAll : function() {
        return canvas.renderAll();
      },
      toJSON : function() {
        return canvas.toJSON();
      }
    };
  });
