/******************************************************************************
File: sidebar.js
By: Ashley Hale

This file depends on:

    For the Konva.js HTML5 2d canvas library - see https://konvajs.github.io/
    <script src="https://cdn.rawgit.com/konvajs/konva/2.4.0/konva.min.js"></script>
    
    For color conversion functions - see https://github.com/mbjordan/Colors
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Colors.js/1.2.4/colors.min.js"></script>

******************************************************************************/


/******************************************************************************
Global variables
******************************************************************************/

var stageDraw;          // The Konva Stage that is parent to all drawing
var container;          // The container inside the Stage, used for key event handling
var layerDraw;          // The Konva Layer in the Stage - there is just one in this app
var GNextShape = "";    // The next shape to draw, selected from Toolbar
var selectedShape;      // The currently selected Kona Shape
var nextShapeID = 1;    // Next number to use for a unique ID for a Konva Shape
var defaultObjectInfoHTML =     // Default text in the sidebar's Object Info tab
    "<h1>Object Info</h1>" +
    "<p>Double-click an existing shape on the canvas to show its info here.<br>" +
    "To create a new shape, go to the Toolbar tab.</p>";
var textarea = "";      // Text Area to edit text content of a Kona Text Shape
var defaultText =       // Default text in a new Text Shape
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod \
tempor incididunt ut labore et dolore magna aliqua. Lectus nulla at \
volutpat diam ut venenatis. Facilisi cras fermentum odio eu. Morbi \
tempus iaculis urna id volutpat lacus. Leo vel fringilla est ullamcorper \
eget nulla. Viverra suspendisse potenti nullam ac tortor vitae purus. \
Etiam dignissim diam quis enim lobortis scelerisque fermentum dui \
faucibus. Odio morbi quis commodo odio. Interdum velit euismod in \
pellentesque massa placerat. Sed faucibus turpis in eu. Porta lorem \
mollis aliquam ut porttitor leo a. Integer vitae justo eget magna \
fermentum. Id consectetur purus ut faucibus pulvinar elementum. Dictum \
varius duis at consectetur lorem donec massa sapien. Vulputate sapien \
nec sagittis aliquam. Congue mauris rhoncus aenean vel elit. Amet risus \
nullam eget felis eget nunc lobortis mattis. Leo duis ut diam quam nulla \
porttitor massa id neque. Vulputate sapien nec sagittis aliquam \
malesuada. \
\r\n\
\r\n\
Facilisis mauris sit amet massa vitae tortor. Neque ornare aenean \
euismod elementum. Tincidunt eget nullam non nisi est sit. Varius duis \
at consectetur lorem donec massa. A diam sollicitudin tempor id eu nisl \
nunc mi ipsum. Convallis tellus id interdum velit laoreet id. Nec \
sagittis aliquam malesuada bibendum. Ullamcorper dignissim cras \
tincidunt lobortis feugiat vivamus at augue. Molestie ac feugiat sed \
lectus vestibulum mattis. Quis commodo odio aenean sed adipiscing diam. \
Pulvinar pellentesque habitant morbi tristique senectus et netus et. \
Aliquam id diam maecenas ultricies mi eget mauris pharetra et. \
Vestibulum mattis ullamcorper velit sed ullamcorper. Sit amet mattis \
vulputate enim nulla. Suscipit adipiscing bibendum est ultricies \
integer. Consequat interdum varius sit amet mattis vulputate. Mauris \
pellentesque pulvinar pellentesque habitant morbi tristique senectus et. \
Volutpat sed cras ornare arcu dui vivamus. Duis tristique sollicitudin \
nibh sit amet commodo. \
\r\n\
\r\n\
Interdum velit laoreet id donec ultrices tincidunt arcu non. Convallis \
tellus id interdum velit. Tincidunt tortor aliquam nulla facilisi. \
Varius morbi enim nunc faucibus. At imperdiet dui accumsan sit amet. \
Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. \
Cursus sit amet dictum sit amet. Neque viverra justo nec ultrices dui \
sapien eget. Cursus vitae congue mauris rhoncus aenean vel elit \
scelerisque mauris. Risus quis varius quam quisque id diam vel. \
Adipiscing tristique risus nec feugiat in fermentum posuere urna. \
\r\n\
\r\n\
Id consectetur purus ut faucibus. Nisi scelerisque eu ultrices vitae. \
Turpis egestas sed tempus urna et pharetra pharetra massa. Cras semper \
auctor neque vitae. Cras adipiscing enim eu turpis egestas pretium \
aenean pharetra magna. Faucibus vitae aliquet nec ullamcorper. Pretium \
aenean pharetra magna ac placerat vestibulum lectus. Turpis massa \
tincidunt dui ut ornare lectus. Tempus urna et pharetra pharetra massa. \
Turpis egestas pretium aenean pharetra magna. Ipsum a arcu cursus vitae \
congue mauris rhoncus. Purus viverra accumsan in nisl nisi. Scelerisque \
viverra mauris in aliquam sem fringilla. Lacus laoreet non curabitur \
gravida arcu ac. Praesent tristique magna sit amet purus gravida. \
Sagittis id consectetur purus ut faucibus pulvinar elementum integer. At \
urna condimentum mattis pellentesque id nibh. Felis eget velit aliquet \
sagittis id. \
\r\n\
\r\n\
Faucibus turpis in eu mi bibendum neque egestas. Eget nullam non nisi \
est sit amet. Ac feugiat sed lectus vestibulum mattis. Libero id \
faucibus nisl tincidunt eget. Bibendum est ultricies integer quis auctor \
elit sed vulputate. Ligula ullamcorper malesuada proin libero nunc \
consequat interdum. Quis auctor elit sed vulputate mi sit amet. Gravida \
arcu ac tortor dignissim convallis aenean et tortor. Volutpat consequat \
mauris nunc congue. Congue mauris rhoncus aenean vel elit. Urna id \
volutpat lacus laoreet non curabitur gravida. Purus non enim praesent \
elementum facilisis leo vel fringilla. Commodo elit at imperdiet dui \
accumsan sit. Ultrices dui sapien eget mi proin sed. Amet mauris commodo \
quis imperdiet massa tincidunt nunc. Aliquam id diam maecenas ultricies \
mi. Congue mauris rhoncus aenean vel elit scelerisque mauris \
pellentesque pulvinar. Faucibus turpis in eu mi bibendum neque egestas \
congue quisque. Aliquam nulla facilisi cras fermentum odio eu feugiat \
pretium nibh."

/******************************************************************************
Simple navigation button functions
******************************************************************************/

function openNav() {
    document.getElementById("mySidebar").style.width = "500px";
    document.getElementById("main").style.marginLeft = "500px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}

function openTab(tabName, elmnt, color) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }

    // Show the specific tab content
    document.getElementById(tabName).style.display = "block";
}

// Click on element (assumed to be a button) with id="defaultOpen"
// and set up some initial text content in sidebar tabs
function clickDefaultButton() {
  document.getElementById("defaultOpen").click();
  clearObjectInfo();
}

/******************************************************************************
Initialize the app. This needs to be called after the <body> is loaded
******************************************************************************/

function initApp() {
    clickDefaultButton();   // Populate default text in sidebar tabs

    // Set up the drawing area
    stageDraw = new Konva.Stage({
        container: 'drawing',
        width: "1000",
        height: "1000"
    });

    container = stageDraw.container();  // Need reference to container for key events
    container.tabIndex = 1;

    // add a layer to the stage
    layerDraw = new Konva.Layer();
    stageDraw.add(layerDraw);

    /**************************************************************************
    Event-handling functions for the Konva Stage and its Container.
    These are in initApp() since the Stage must be created first.
    **************************************************************************/

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
          selectedShape = e.target;
          tr.attachTo(selectedShape);
          layerDraw.draw();
          getShapeAttributes(selectedShape);
          openNav();
          openTab('Object Info', this, 'red');
        })

    stageDraw.on('click', function (e) {
      // When single click, "destroy" all transformers and redraw
      stageDraw.find('Transformer').destroy();
      layerDraw.draw();

      // Get the position of the mouse
      var pointerPosition = stageDraw.getPointerPosition();

      // When a certain button in the toolbar is clicked
      // Click the canvas to add a new default shape
      var newShape;
      switch(GNextShape){
        case "circle":
          newShape = new Konva.Circle({
            x: pointerPosition.x,
            y: pointerPosition.y,
            radius: 70,
            fill: $c.name2hex('red'),
            stroke: $c.name2hex('black'),
            strokeWidth: 4,
            strokeScaleEnabled: false
          });
          break;
        case "rectangle":
          newShape = new Konva.Rect({
              x: pointerPosition.x,
              y: pointerPosition.y,
              width: 100,
              height: 50,
              fill: $c.name2hex('green'),
              stroke: $c.name2hex('black'),
              strokeWidth: 4,
              strokeScaleEnabled: false
          });
          break;
        case "ellipse":
          newShape = new Konva.Ellipse({
            x: pointerPosition.x,
            y: pointerPosition.y,
            radius: {
                x: 100,
                y: 50
            },
            fill: $c.name2hex('yellow'),
            stroke: $c.name2hex('black'),
            strokeWidth: 4,
            strokeScaleEnabled: false
          });
          break;
        case "wedge":
          newShape = new Konva.Wedge({
            x: pointerPosition.x,
            y: pointerPosition.y,
            radius: 70,
            angle: 60,
            fill: $c.name2hex('red'),
            stroke: $c.name2hex('black'),
            strokeWidth: 4,
            rotation: -120,
            strokeScaleEnabled: false
          });
          break;
        case "line":
          newShape = new Konva.Line({
            // points = [x1, y1, x2, y2, x3, y3]
            points: [pointerPosition.x+5, pointerPosition.y+70,
              pointerPosition.x+140, pointerPosition.y+23,
              pointerPosition.x+250, pointerPosition.y+60,
              pointerPosition.x+300, pointerPosition.y+20],
            stroke: $c.name2hex('red'),
            strokeWidth: 15,
            lineCap: 'round',
            lineJoin: 'round',
            strokeScaleEnabled: false
          });
          break;
        case "image":
          var imageObj = new Image();
          imageObj.src = 'icons/image_icon.png';
          imageObj.onload = function() {
            newShape = new Konva.Image({
              x: pointerPosition.x,
              y: pointerPosition.y,
              image: imageObj,
              width: 140,
              height: 154,
              strokeScaleEnabled: false
            });
            finishNewShape(newShape);
          };
          break;
        // TODO //
        case "arrow":
          alert("Arrow not implemented yet");
          break;
        case "text":
          newShape = new Konva.Text({
              text: defaultText,
              fontSize: 20,
              x: pointerPosition.x,
              y: pointerPosition.y,
              width: 500,
              height: 300,
              strokeScaleEnabled: false
//               fill: $c.name2hex('green'),
//               stroke: $c.name2hex('black'),
//               strokeWidth: 4
          });
          break;
        case "label":
          alert("Label not implemented yet");
          break;
        case "star":
          alert("Star not implemented yet");
          break;
        case "ring":
          alert("Ring not implemented yet");
          break;
        case "arc":
          alert("Arc not implemented yet");
          break;
        case "regular-polygon":
          alert("Regular Polygon not implemented yet");
          break;
        default:
          break;
      }

      if (newShape) {
          finishNewShape(newShape);
      }

      GNextShape="";
      clearObjectInfo();
    });     // End stageDraw.on('click', ...)

    container.addEventListener('keydown', function (e) {
      // Destroy selected shape and its transformer
      if (e.keyCode === 8 || e.keyCode === 46) {
        selectedShape.destroy();
        stageDraw.find('Transformer').destroy();
        clearObjectInfo();
      }
      layerDraw.draw();
    });
}

/******************************************************************************
Functions to create and update Shapes
******************************************************************************/

// Set GNextShape to draw
function setShape(shape) {
  GNextShape = shape;
}

// Clear out the Object Info tab
function clearObjectInfo() {
    document.getElementById("Object Info").innerHTML = defaultObjectInfoHTML;
}

// Finish creating a new Shape
function finishNewShape(newShape) {
    // Transformers adjust scale, not size. It's confusing, we usually don't want it
    // for outlines, and we certainly don't want it for text. So, as a Transformer
    // scales a shape, update it's width and height to the equivalent of scale 1.
    // From: https://github.com/konvajs/konva/issues/449#issuecomment-419374138
    newShape.on('transform', () => {
    newShape.setAttrs({
      width: newShape.width() * newShape.scaleX(),
      height: newShape.height() * newShape.scaleY(),
      scaleX: 1,
      scaleY: 1
    });
    })

    // When a Transformer is done dragging, update the contents of the
    // sidebar's Object Info tab
    newShape.on('transformend', function () {
      getShapeAttributes(newShape);
    });


    setShapeID(newShape);
    layerDraw.add(newShape);
    layerDraw.draw();
    newShape.draggable('true');
}

// Get the attributes of the selected shape and show on the Object Info tab
function getShapeAttributes(shape) {
  // When shape selected will change Object Info content to that shape's
  // specific attributes
  var isShapeValid = true;
  document.getElementById("Object Info").innerHTML = "<h1>Object Info</h1>";
  switch(shape.getClassName()){
    case "Circle":
      createShapeAttributeString(shape, "ID (Make Unique): ", "id");
      createShapeAttributeString(shape, "X-Position (Center of Circle): ", "x", "number");
      createShapeAttributeString(shape, "Y-Position (Center of Circle): ", "y", "number");
//       createShapeAttributeString(shape, "Scale-X: ", "scaleX", "number", "readonly");
//       createShapeAttributeString(shape, "Scale-Y: ", "scaleY", "number", "readonly");
      createShapeAttributeString(shape, "width: ", "width", "number", "readonly");
      createShapeAttributeString(shape, "height: ", "height", "number", "readonly");
      createShapeAttributeString(shape, "Rotation (Degrees): ", "rotation", "number");
      createShapeAttributeString(shape, "Radius (Pixels): ", "radius", "number");
      createShapeAttributeString(shape, "Fill Color: ", "fill", "color");
      createShapeAttributeString(shape, "Fill Enabled (true/false): ", "fillEnabled", "checkbox");
      createShapeAttributeString(shape, "Shape Outline Color: ", "stroke", "color");
      createShapeAttributeString(shape, "Shape Outline Width: ", "strokeWidth", "number");
      break;
    case "Rect":
      createShapeAttributeString(shape, "ID (Make Unique): ", "id");
      createShapeAttributeString(shape, "X-Position: ", "x", "number");
      createShapeAttributeString(shape, "Y-Position: ", "y", "number");
//       createShapeAttributeString(shape, "Scale-X: ", "scaleX", "number", "readonly");
//       createShapeAttributeString(shape, "Scale-Y: ", "scaleY", "number", "readonly");
      createShapeAttributeString(shape, "width: ", "width", "number");
      createShapeAttributeString(shape, "height: ", "height", "number");
      createShapeAttributeString(shape, "Rotation (Degrees): ", "rotation", "number");
      createShapeAttributeString(shape, "Fill Color: ", "fill", "color");
      createShapeAttributeString(shape, "Fill Enabled (true/false): ", "fillEnabled", "checkbox");
      createShapeAttributeString(shape, "Shape Outline Color: ", "stroke", "color");
      createShapeAttributeString(shape, "Shape Outline Width: ", "strokeWidth", "number");
      break;
    case "Ellipse":
      createShapeAttributeString(shape, "ID (Make Unique): ", "id");
      createShapeAttributeString(shape, "X-Position (Center of Circle): ", "x", "number");
      createShapeAttributeString(shape, "Y-Position (Center of Circle): ", "y", "number");
//       createShapeAttributeString(shape, "Scale-X: ", "scaleX", "number", "readonly");
//       createShapeAttributeString(shape, "Scale-Y: ", "scaleY", "number", "readonly");
      createShapeAttributeString(shape, "width: ", "width", "number", "readonly");
      createShapeAttributeString(shape, "height: ", "height", "number", "readonly");
      createShapeAttributeString(shape, "Rotation (Degrees): ", "rotation", "number");
      createShapeAttributeString(shape, "Radius X (Pixels): ", "radiusX", "number");
      createShapeAttributeString(shape, "Radius Y (Pixels): ", "radiusY", "number");
      createShapeAttributeString(shape, "Fill Color: ", "fill", "color");
      createShapeAttributeString(shape, "Fill Enabled (true/false): ", "fillEnabled", "checkbox");
      createShapeAttributeString(shape, "Shape Outline Color: ", "stroke", "color");
      createShapeAttributeString(shape, "Shape Outline Width: ", "strokeWidth", "number");
      break;
    case "Wedge":
      createShapeAttributeString(shape, "ID (Make Unique): ", "id");
      createShapeAttributeString(shape, "X-Position (Center of Ellipse): ", "x", "number");
      createShapeAttributeString(shape, "Y-Position (Center of Ellipse): ", "y", "number");
//       createShapeAttributeString(shape, "Scale-X: ", "scaleX", "number", "readonly");
//       createShapeAttributeString(shape, "Scale-Y: ", "scaleY", "number", "readonly");
      createShapeAttributeString(shape, "width: ", "width", "number", "readonly");
      createShapeAttributeString(shape, "height: ", "height", "number", "readonly");
      createShapeAttributeString(shape, "Rotation (Degrees): ", "rotation", "number");
      createShapeAttributeString(shape, "Angle (Degrees): ", "angle", "number");
      createShapeAttributeString(shape, "Radius (Pixels): ", "radius", "number");
      createShapeAttributeString(shape, "Fill Color: ", "fill", "color");
      createShapeAttributeString(shape, "Fill Enabled (true/false): ", "fillEnabled", "checkbox");
      createShapeAttributeString(shape, "Shape Outline Color: ", "stroke", "color");
      createShapeAttributeString(shape, "Shape Outline Width: ", "strokeWidth", "number");
      break;
    // TODO //
    case "Line":
      createShapeAttributeString(shape, "ID (Make Unique): ", "id");
      //createShapeAttributeString(shape, "X-Position (Left most point): ", "x", "number");
      //createShapeAttributeString(shape, "Y-Position (Left most point): ", "y", "number");
      createShapeAttributeString(shape, "Points: ", "points", "number");
      createShapeAttributeString(shape, "Line Join Point Shape (miter, round, or bevel): ", "lineJoin");
      createShapeAttributeString(shape, "Line End Shape (butt, round, or square): ", "lineCap");
//       createShapeAttributeString(shape, "Scale-X: ", "scaleX", "number", "readonly");
//       createShapeAttributeString(shape, "Scale-Y: ", "scaleY", "number", "readonly");
      createShapeAttributeString(shape, "width: ", "width", "number", "readonly");
      createShapeAttributeString(shape, "height: ", "height", "number", "readonly");
      createShapeAttributeString(shape, "Rotation (Degrees): ", "rotation", "number");
      //createShapeAttributeString(shape, "Fill Color: ", "fill", "color");
      //createShapeAttributeString(shape, "Fill Enabled (true/false): ", "fillEnabled", "checkbox");
      createShapeAttributeString(shape, "Line Color: ", "stroke", "color");
      createShapeAttributeString(shape, "Line Width: ", "strokeWidth", "number");
      break;
    case "Image":
      createShapeAttributeString(shape, "ID (Make Unique): ", "id");
      createShapeAttributeString(shape, "Image File Name: ", "image");
      createShapeAttributeString(shape, "X-Position (Center of Image): ", "x", "number");
      createShapeAttributeString(shape, "Y-Position (Center of Image): ", "y", "number");
//       createShapeAttributeString(shape, "Scale-X: ", "scaleX", "number", "readonly");
//       createShapeAttributeString(shape, "Scale-Y: ", "scaleY", "number", "readonly");
      createShapeAttributeString(shape, "width: ", "width", "number");
      createShapeAttributeString(shape, "height: ", "height", "number");
      createShapeAttributeString(shape, "Rotation (Degrees): ", "rotation", "number");
      createShapeAttributeString(shape, "Shape Outline Color: ", "stroke", "color");
      createShapeAttributeString(shape, "Shape Outline Width: ", "strokeWidth", "number");
      break;
    case "Arrow":
      isShapeValid = false;
      break;
    case "Text":
      createShapeAttributeString(shape, "ID (Make Unique): ", "id");
      createShapeAttributeString(shape, "X-Position: ", "x", "number");
      createShapeAttributeString(shape, "Y-Position: ", "y", "number");
//       createShapeAttributeString(shape, "Scale-X: ", "scaleX", "number", "readonly");
//       createShapeAttributeString(shape, "Scale-Y: ", "scaleY", "number", "readonly");
      createShapeAttributeString(shape, "width: ", "width", "number");
      createShapeAttributeString(shape, "height: ", "height", "number");
      createShapeAttributeString(shape, "Rotation (Degrees): ", "rotation", "number");
      createShapeAttributeString(shape, "Fill Color: ", "fill", "color");
      createShapeAttributeString(shape, "Fill Enabled (true/false): ", "fillEnabled", "checkbox");
      createShapeAttributeString(shape, "Shape Outline Color: ", "stroke", "color");
      createShapeAttributeString(shape, "Shape Outline Width: ", "strokeWidth", "number");
      createShapeAttributeString(shape, "Font Family (Arial, Times, etc.): ", "fontFamily");
      createShapeAttributeString(shape, "Font Size: ", "fontSize");
      createShapeAttributeString(shape, "Font Style (normal, italic, bold): ", "fontStyle");
      createShapeAttributeString(shape, "Font Variant (normal, small-caps): ", "fontVariant");
      createShapeAttributeString(shape, "Align (left, center, right, justify): ", "align");
      createShapeAttributeString(shape, "Vertical Align (top, middle, bottom): ", "verticalAlign");
      createShapeAttributeString(shape, "Padding (Pixels): ", "padding", "number");
      createShapeAttributeString(shape, "Line Height (1, 2, ...): ", "lineHeight", "number");
      createShapeAttributeString(shape, "Wrap (word, char, none): ", "wrap");
      createShapeAttributeString(shape, "Ellipsis (true/false): ", "ellipsis", "checkbox");
      // Special handling for a text edit box
        textarea = document.createElement('textarea');
        textarea.value = shape.getAttr("text");
//         textarea.style.position = 'absolute';
//         textarea.style.top = areaPosition.y + 'px';
//         textarea.style.left = areaPosition.x + 'px';
        textarea.style.width = "400px";
        textarea.setAttribute("id", shape.id() + "textarea");

        document.getElementById("Object Info").insertAdjacentHTML('beforeend', "Text:<br><br>");
        document.getElementById("Object Info").appendChild(textarea);
        document.getElementById("Object Info").insertAdjacentHTML('beforeend', "<br>");
        document.getElementById("Object Info").insertAdjacentHTML('beforeend', "<br>");
      break;
    case "Label":
      isShapeValid = false;
      break;
    case "Star":
      isShapeValid = false;
      break;
    case "Ring":
      isShapeValid = false;
      break;
    case "Arc":
      isShapeValid = false;
      break;
    case "RegularPolygon":
      isShapeValid = false;
      break;
    default:
      isShapeValid = false;
      alert("Shape not valid");
      break;
  }
  
  // If a valid shape was found, add the Update button, too.
  if (isShapeValid) {
    var btn = document.createElement("BUTTON");
    btn.setAttribute("class", "updatebtn");
    var t = document.createTextNode("Update");
    btn.appendChild(t);
    document.getElementById("Object Info").appendChild(btn);
    btn.onclick = function() {
      setSelectedShapeAttributes(shape);
    };
  } else {
    clearObjectInfo();
  }
}   // End function getShapeAttributes(shape)

// Dynamically add string/textbox value to the  Object Info tab
// If inputType is provided, it should be the type of the HTML <input>, such
// as "number" or "color". If not provided, inputType defaults to "text".
// See https://www.w3schools.com/tags/att_input_type.asp
// Note that for "color" the color value should be in hex format, not a color name.
// If readonly is true then the <input> will be readonly.
function createShapeAttributeString(shape, string, value, inputType, readonly) {
  if (inputType === undefined) {
    inputType = "text";
  }
  var tempBox = document.createElement('INPUT');
  tempBox.setAttribute("type", inputType);
  tempBox.setAttribute("value", shape.getAttr(value));
  tempBox.setAttribute("id", shape.id() + value);
  if (readonly) {
    tempBox.setAttribute("readonly", "true");
  }
  document.getElementById("Object Info").insertAdjacentHTML('beforeend', string);
  document.getElementById("Object Info").appendChild(tempBox);
  document.getElementById("Object Info").insertAdjacentHTML('beforeend', "<br>");
  document.getElementById("Object Info").insertAdjacentHTML('beforeend', "<br>");
}

// Add a unique ID to a shape; If shape already has an ID, do nothing.
// NOTE THIS SIMPLE IMPLEMENTATION ASSUMES ID NUMBERS <= 999999
function setShapeID(shape) {
  if (!shape.id()) {
    shape.id(shape.getClassName() + "ID" + ("000000"+nextShapeID++).slice(-6));
  }
}

// TODO //
// Will take the values from the textboxes in Object Info
// to change selected shape When "Update" button is clicked.
// Must be careful to treat numbers as numbers and not strings, otherwise the Konva
// libraries hit exceptions that cause a variety of problems. For our cases,
// the unary plus operator seems to be the best overall approach, as per
// https://medium.com/@nikjohn/cast-to-number-in-javascript-using-the-unary-operator-f4ca67c792ce
function setSelectedShapeAttributes(shape) {
  var isShapeValid = true;
  switch(shape.getClassName()){
    case "Circle":
      shape.setAttr("id", document.getElementById(shape.id() + "id").value);
      shape.setAttr("x", +(document.getElementById(shape.id() + "x").value));
      shape.setAttr("y", +(document.getElementById(shape.id() + "y").value));
//       shape.setAttr("scaleX", +(document.getElementById(shape.id() + "scaleX").value));
//       shape.setAttr("scaleY", +(document.getElementById(shape.id() + "scaleY").value));
      shape.setAttr("width", +(document.getElementById(shape.id() + "width").value));
      shape.setAttr("height", +(document.getElementById(shape.id() + "height").value));
      shape.setAttr("rotation", +(document.getElementById(shape.id() + "rotation").value));
      shape.setAttr("radius", +(document.getElementById(shape.id() + "radius").value));
      shape.setAttr("fill", document.getElementById(shape.id() + "fill").value);
      shape.setAttr("fillEnabled", document.getElementById(shape.id() + "fillEnabled").value);
      shape.setAttr("stroke", document.getElementById(shape.id() + "stroke").value);
      shape.setAttr("strokeWidth", +(document.getElementById(shape.id() + "strokeWidth").value));
      break;
    case "Rect":
/* 
      createShapeAttributeString("ID (Make Unique): ", "id");
      createShapeAttributeString("X-Position: ", "x");
      createShapeAttributeString("Y-Position: ", "y");
//       createShapeAttributeString("Scale-X: ", "scaleX");
//       createShapeAttributeString("Scale-Y: ", "scaleY");
      createShapeAttributeString("width: ", "width");
      createShapeAttributeString("height: ", "height");
      createShapeAttributeString("Rotation (Degrees): ", "rotation");
      createShapeAttributeString("Fill Color: ", "fill");
      createShapeAttributeString("Fill Enabled (true/false): ", "fillEnabled");
      createShapeAttributeString("Shape Outline Color: ", "stroke");
      createShapeAttributeString("Shape Outline Width: ", "strokeWidth");
 */
      break;
    case "Ellipse":
/* 
      createShapeAttributeString("ID (Make Unique): ", "id");
      createShapeAttributeString("X-Position (Center of Circle): ", "x");
      createShapeAttributeString("Y-Position (Center of Circle): ", "y");
//       createShapeAttributeString("Scale-X: ", "scaleX");
//       createShapeAttributeString("Scale-Y: ", "scaleY");
      createShapeAttributeString("width: ", "width");
      createShapeAttributeString("height: ", "height");
      createShapeAttributeString("Rotation (Degrees): ", "rotation");
      createShapeAttributeString("Radius X (Pixels): ", "radiusX");
      createShapeAttributeString("Radius Y (Pixels): ", "radiusY");
      createShapeAttributeString("Fill Color: ", "fill");
      createShapeAttributeString("Fill Enabled (true/false): ", "fillEnabled");
      createShapeAttributeString("Shape Outline Color: ", "stroke");
      createShapeAttributeString("Shape Outline Width: ", "strokeWidth");
 */
      break;
    case "Wedge":
/* 
      createShapeAttributeString("ID (Make Unique): ", "id");
      createShapeAttributeString("X-Position (Center of Ellipse): ", "x");
      createShapeAttributeString("Y-Position (Center of Ellipse): ", "y");
//       createShapeAttributeString("Scale-X: ", "scaleX");
//       createShapeAttributeString("Scale-Y: ", "scaleY");
      createShapeAttributeString("width: ", "width");
      createShapeAttributeString("height: ", "height");
      createShapeAttributeString("Rotation (Degrees): ", "rotation");
      createShapeAttributeString("Angle (Degrees): ", "angle");
      createShapeAttributeString("Radius (Pixels): ", "radius");
      createShapeAttributeString("Fill Color: ", "fill");
      createShapeAttributeString("Fill Enabled (true/false): ", "fillEnabled");
      createShapeAttributeString("Shape Outline Color: ", "stroke");
      createShapeAttributeString("Shape Outline Width: ", "strokeWidth");
 */
      break;
    // TODO //
    case "Line":
/* 
      createShapeAttributeString("ID (Make Unique): ", "id");
      //createShapeAttributeString("X-Position (Left most point): ", "x");
      //createShapeAttributeString("Y-Position (Left most point): ", "y");
      createShapeAttributeString("Points: ", "points");
      createShapeAttributeString("Line Join Point Shape (miter, round, or bevel): ", "lineJoin");
      createShapeAttributeString("Line End Shape (butt, round, or square): ", "lineCap");
//       createShapeAttributeString("Scale-X: ", "scaleX");
//       createShapeAttributeString("Scale-Y: ", "scaleY");
      createShapeAttributeString("width: ", "width");
      createShapeAttributeString("height: ", "height");
      createShapeAttributeString("Rotation (Degrees): ", "rotation");
      //createShapeAttributeString("Fill Color: ", "fill");
      //createShapeAttributeString("Fill Enabled (true/false): ", "fillEnabled");
      createShapeAttributeString("Line Color: ", "stroke");
      createShapeAttributeString("Line Width: ", "strokeWidth");
 */
      break;
    case "Image":
/* 
      createShapeAttributeString("ID (Make Unique): ", "id");
      createShapeAttributeString("Image File Name: ", "image");
      createShapeAttributeString("X-Position (Center of Image): ", "x");
      createShapeAttributeString("Y-Position (Center of Image): ", "y");
//       createShapeAttributeString("Scale-X: ", "scaleX");
//       createShapeAttributeString("Scale-Y: ", "scaleY");
      createShapeAttributeString("width: ", "width");
      createShapeAttributeString("height: ", "height");
      createShapeAttributeString("Rotation (Degrees): ", "rotation");
      createShapeAttributeString("Shape Outline Color: ", "stroke");
      createShapeAttributeString("Shape Outline Width: ", "strokeWidth");
 */
      break;
    case "Arrow":
      isShapeValid = false;
      break;
    case "Text":
      shape.setAttr("id", document.getElementById(shape.id() + "id").value);
      shape.setAttr("x", +(document.getElementById(shape.id() + "x").value));
      shape.setAttr("y", +(document.getElementById(shape.id() + "y").value));
//       shape.setAttr("scaleX", +(document.getElementById(shape.id() + "scaleX").value));
//       shape.setAttr("scaleY", +(document.getElementById(shape.id() + "scaleY").value));
      shape.setAttr("width", +(document.getElementById(shape.id() + "width").value));
      shape.setAttr("height", +(document.getElementById(shape.id() + "height").value));
      shape.setAttr("rotation", +(document.getElementById(shape.id() + "rotation").value));
      shape.setAttr("fill", document.getElementById(shape.id() + "fill").value);
      shape.setAttr("fillEnabled", document.getElementById(shape.id() + "fillEnabled").value);
      shape.setAttr("stroke", document.getElementById(shape.id() + "stroke").value);
      shape.setAttr("strokeWidth", +(document.getElementById(shape.id() + "strokeWidth").value));
      shape.setAttr("fontFamily", document.getElementById(shape.id() + "fontFamily").value);
      shape.setAttr("fontSize", +(document.getElementById(shape.id() + "fontSize").value));
      shape.setAttr("fontStyle", document.getElementById(shape.id() + "fontStyle").value);
      shape.setAttr("fontVariant", document.getElementById(shape.id() + "fontVariant").value);
      shape.setAttr("align", document.getElementById(shape.id() + "align").value);
      shape.setAttr("verticalAlign", document.getElementById(shape.id() + "verticalAlign").value);
      shape.setAttr("padding", +(document.getElementById(shape.id() + "padding").value));
      shape.setAttr("lineHeight", +(document.getElementById(shape.id() + "lineHeight").value));
      shape.setAttr("wrap", document.getElementById(shape.id() + "wrap").value);
//TODO Bug: Ellipsis is not saving properly
      shape.setAttr("ellipsis", document.getElementById(shape.id() + "ellipsis").value);
      shape.setAttr("text", document.getElementById(shape.id() + "textarea").value);
      break;
    case "Label":
      isShapeValid = false;
      break;
    case "Star":
      isShapeValid = false;
      break;
    case "Ring":
      isShapeValid = false;
      break;
    case "Arc":
      isShapeValid = false;
      break;
    case "RegularPolygon":
      isShapeValid = false;
      break;
    default:
      isShapeValid = false;
      alert("Shape not valid");
      break;
  }

  // If a valid shape was processed, update the drawing area
  if (isShapeValid) {
    stageDraw.find('Transformer').forceUpdate();      // Fit Transformer to updated shape
    layerDraw.draw();
  }
}

/******************************************************************************
Functions to generate HTML and to make it downloadable
******************************************************************************/

/* 
Based on https://konvajs.github.io/docs/data_and_serialization/Stage_Data_URL.html
The basic structure of the generated HTML looks like this:

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
    <style>
        [[[ CSS positioning for images ]]]
    </style>
</head>
<body>
    [[[ Image data in individual DIVs ]]]
</body>
</html>
 */
function generateHTML() {

    var prefixHead = encodeURIComponent(
        "<!DOCTYPE html>\n" +
        "<html>\n" +
        "<head>\n" +
        "    <meta charset=\"utf-8\" />\n" +
        "    <title></title>\n" +
        "    <style>\n"
    );

    var suffixHead = encodeURIComponent(
        "    </style>\n" +
        "</head>\n"
    );

    var prefixBody = encodeURIComponent(
        "<body>\n"
    );

    var suffixBody = encodeURIComponent(
        "</body>\n" +
        "</html>\n"
    );

    var styles = "";        // Collect content for <style> section in <head>
    var bodyHTML = "";      // Collect Text and image data for <body>
    
    // Internally, Konva appears to treat Transformers as shapes, so remove any
    // before collecting and converting shapes to bodyHTML. Since this also
    // makes it appear no Shape is selected, clear the Object Info tab.
    stageDraw.find('Transformer').destroy();
    layerDraw.draw();
    clearObjectInfo();
    
    // Purely for style reasons, let's process Text Shapes first
    var shapes = stageDraw.find('Text');
    var numTexts = shapes.length;
    bodyHTML += encodeURIComponent(
        "    <!-- " + numTexts + " Text DIV(s) -->\n"
    );
    shapes.each(function(shape) {
        var ParaID = shape.getAttr("id") + "Para";
        bodyHTML += encodeURIComponent(
            "    <div id=\"" + shape.getAttr("id") + "\">\n" +
            "        <p id=\"" + ParaID + "\">" + shape.getAttr("text") + "</p>\n" +
            "    </div>\n"
        );
        
        // CSS positioning and other style attributes
        // https://www.w3schools.com/css/css_font.asp
        // https://www.w3schools.com/css/css_align.asp
        // https://www.w3schools.com/css/css_padding.asp
        // https://www.w3schools.com/css/css_text.asp
        // https://www.w3schools.com/cssref/css3_pr_word-break.asp
        // https://www.w3schools.com/cssref/css3_pr_text-overflow.asp
        // https://www.w3schools.com/cssref/css3_pr_transform.asp
        // https://css-tricks.com/almanac/properties/t/text-overflow/
        var wrap =  "            word-wrap: normal;\n";
        var paraWrap = "";
        if (shape.getAttr("wrap") == "char") {
            wrap =  "            word-wrap: break-word;\n"
        } else if (shape.getAttr("wrap") == "none") {
            wrap =  "            white-space: nowrap;\n";
            paraWrap =
                    "        #" + ParaID + " {\n" +
                    "            overflow: auto;\n";
//TODO Debug console.log("ellipsis is " + shape.getAttr("ellipsis"));
            if (shape.getAttr("ellipsis")) {
//TODO Debug console.log("went to true");
                paraWrap +=
                    "            text-overflow: ellipsis;\n";
            } else {
//TODO Debug console.log("went to false");
                paraWrap +=
                    "            text-overflow: clip;\n";
            }
            paraWrap +=
                    "        }\n";
        }
        // TODO fill, fillEnabled, strokeWidth
        styles += encodeURIComponent(
            "        #" + shape.getAttr("id") + " {\n" +
            "            position: absolute;\n" +
            "            left: " + shape.getAttr("x") + "px;\n" +
            "            top: " + shape.getAttr("y") + "px;\n" +
            "            width: " + shape.getAttr("width") + "px;\n" +
            "            height: " + shape.getAttr("height") + "px;\n" +
            "            transform: rotate(" + shape.getAttr("rotation") + "deg);\n" +
            "            color: " + shape.getAttr("stroke") + ";\n" +
            "            font-family: \"" + shape.getAttr("fontFamily") + "\", monospace;\n" +
            "            font-size: " + shape.getAttr("fontSize") + "px;\n" +
            "            font-style: " + shape.getAttr("fontStyle") + ";\n" +
            "            font-variant: " + shape.getAttr("fontVariant") + ";\n" +
            "            text-align: " + shape.getAttr("align") + ";\n" +
            "            vertical-align: " + shape.getAttr("verticalAlign") + ";\n" +
            "            padding: " + shape.getAttr("padding") + ";\n" +
            "            line-height: " + shape.getAttr("lineHeight") + ";\n" +
            "            overflow: auto;\n" +
            wrap +
            "        }\n" +
            paraWrap
        );
    });

    // toDataURL() returns a base64 encoded URI something like:
    //      data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+...
    // API reference: https://konvajs.github.io/api/Konva.Stage.html#toDataURL__anchor

    // Collect image and style info for all Shapes in the stage
    shapes = stageDraw.find('Shape');
    bodyHTML += encodeURIComponent(
        "\n    <!-- " + (shapes.length - numTexts) + " Image(s) -->\n"
    );
    shapes.each(function(shape) {
        if (!(shape.getClassName() == "Text")) {
            // Don't (re-)encode the base64 image data from toDataURL()
            bodyHTML += encodeURIComponent(
                "    <div id=\"" + shape.getAttr("id") + "\">\n" +
                "        <img src=\""
//TODO Need special handling for an Image Shape???
            ) + shape.toDataURL() + encodeURIComponent("\"/>\n" +
                "    </div>\n"
            );
        
            // CSS positioning: https://www.elated.com/articles/css-positioning/
            styles += encodeURIComponent(
                "        #" + shape.getAttr("id") + " {\n" +
                "            position: absolute;\n" +
                "            left: " + shape.getAttr("x") + "px;\n" +
                "            top: " + shape.getAttr("y") + "px;\n" +
                "        }\n"
            );
        }
    });

//     alert("continue");              // For debug: link.click() in downloadURI clears console!
    downloadURI("data:text/html," +
        prefixHead + styles + suffixHead +
        prefixBody + bodyHTML + suffixBody, 'stage.html');
}

// From https://konvajs.github.io/docs/data_and_serialization/Stage_Data_URL.html
function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

