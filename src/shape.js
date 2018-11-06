var stageDraw = new Konva.Stage({
    container: 'drawing',
    width: "1000",
    height: "1000"
});

var layerDraw = new Konva.Layer();

/*
* create a triangle shape by defining a
* drawing function which draws a triangle
*/
var triangle = new Konva.Shape({
    sceneFunc: function (context, shape) {
        context.beginPath();
        context.moveTo(20, 50);
        context.lineTo(220, 80);
        context.quadraticCurveTo(150, 100, 260, 170);
        context.closePath();

        // (!) Konva specific method, it is very important
        context.fillStrokeShape(shape);
    },
    fill: '#00D2FF',
    stroke: 'black',
    strokeWidth: 4
});

var rect = new Konva.Rect({
    x: 50,
    y: 50,
    width: 100,
    height: 50,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4
});

// add the shape to the layer
layerDraw.add(rect);

triangle.draggable('true');
rect.draggable('true');

// add the triangle shape to the layer
layerDraw.add(triangle);

// add the layer to the stage
stageDraw.add(layerDraw);

// On double click manipulate shape
stageDraw.on('dblclick', function (e) {
      // if click on empty area - remove all transformers
      if (e.target === stageDraw) {
        stageDraw.find('Transformer').destroy();
        layerDraw.draw();
        return;
      }

      // remove old transformers
      // TODO: we can skip it if current shape is already selected
      stageDraw.find('Transformer').destroy();

      // create new transformer
      var tr = new Konva.Transformer();
      layerDraw.add(tr);
      tr.attachTo(e.target);
      layerDraw.draw();
    })

// TODO: Create draggable for all
stageDraw.on('click', function (e) {
  // When single click, "destroy" all transformers and redraw
  stageDraw.find('Transformer').destroy();
  layerDraw.draw();

  // Get the position of the mouse
  var pointerPosition = stageDraw.getPointerPosition();

  // When a certain button in the toolbar is clicked
  // Click the canvas to add a new default shape
  switch(GNextShape){
    case "circle":
      var newCircle = new Konva.Circle({
        x: pointerPosition.x,
        y: pointerPosition.y,
        radius: 70,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4
      });
      layerDraw.add(newCircle);
      layerDraw.draw();
      newCircle.draggable('true');
      break;
    case "rectangle":
      var newRect = new Konva.Rect({
          x: pointerPosition.x,
          y: pointerPosition.y,
          width: 100,
          height: 50,
          fill: 'green',
          stroke: 'black',
          strokeWidth: 4
      });
      layerDraw.add(newRect);
      layerDraw.draw();
      break;
    case "ellipse":
      var newOval = new Konva.Ellipse({
        x: pointerPosition.x,
        y: pointerPosition.y,
        radius: {
            x: 100,
            y: 50
        },
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 4
      });
      layerDraw.add(newOval);
      layerDraw.draw();
      break;
    case "wedge":
      var newWedge = new Konva.Wedge({
        x: pointerPosition.x,
        y: pointerPosition.y,
        radius: 70,
        angle: 60,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4,
        rotation: -120
      });
      layerDraw.add(newWedge);
      layerDraw.draw();
      break;
    case "line-simple":
      break;
    case "line-polygon":
      break;
    case "line-spline":
      break;
    case "line-blob":
      break;
    case "image":
      var imageObj = new Image();
      var newImage;
      imageObj.src = 'icons/image_icon.png';
      imageObj.onload = function() {
        newImage = new Konva.Image({
          x: pointerPosition.x,
          y: pointerPosition.y,
          image: imageObj,
          width: 106,
          height: 118
        });
        layerDraw.add(newImage);
        layerDraw.draw();
        newImage.draggable('true');
      };
      break;
    case "arrow":
      break;
    case "label":
      break;
    case "star":
      break;
    case "ring":
      break;
    case "arc":
      break;
    case "regular-polygon":
      break;
    case "custom-shape":
      break;
    default:
      break;
  }
  GNextShape="";
});
