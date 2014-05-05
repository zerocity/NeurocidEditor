'use strict';

angular.module('neurocidEditorApp')
  .factory('canvas', function () {
    // Fabric initiation
    var canvas = new fabric.Canvas('canvas');
    var img= new Image();
    canvas.backgroundColor = new fabric.Pattern({ source: 'images/bp.png'})
    canvas.renderAll();

    canvas.setHeight(3000);
    canvas.setWidth(3000);
    canvas.selectionColor = 'rgba(255,255,255,0.3)';
    canvas.selectionDashArray = [10,10];
    canvas.selectionBorderColor = 'blue';
    canvas.selectionLineWidth = 3;
    canvas.allowTouchScrolling = true;
    canvas.renderAll();

    var editorDiv = document.getElementById('editor');
    var centerEditorY = editorDiv.clientHeight / 2
    var centerEditorX = editorDiv.clientWidth / 2
    // center
    editorDiv.scrollTop = 1500;
    editorDiv.scrollLeft = 1500;

    // ZOOM
    var copiedObject;
    var copiedObjects = new Array();
    var canvasScale = 1;
    var SCALE_FACTOR = 1.2;

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

      canvas.calcOffset();
    }

    // Public API here
    return {
      initMouseEvent : function() {
        canvas.on('mouse:down', function(o) {
          var lx = (o.e.layerX-editorDiv.scrollLeft <= 100), // left x
              rx = (o.e.layerX-editorDiv.scrollLeft >= editorDiv.clientWidth-100), // right x
              ly = o.e.layerY-editorDiv.scrollTop <= 100, // left y
              ry = o.e.layerY-editorDiv.scrollTop >= editorDiv.clientHeight-100; // right y
            if (lx || rx || ly || ry) {
              setCanvasScroll(lx,rx,ly,ry)
            }
        });
      },
      set : function(object) {
        canvas.add(object);
        canvas.renderAll();
        canvas.calcOffset();
      },
      setCanvasScale : function () {
        canvasScale = canvasScale / SCALE_FACTOR
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
