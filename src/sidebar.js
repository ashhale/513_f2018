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
var modal;              // The modal dialog to display error messages
var defaultPageTitle =  // Default page title for generated HTML
    "Working Title";
var defaultObjectInfoHTML =     // Default text in the sidebar's Object Info tab
    "<h1>Object Info</h1>" +
    "<p>Click a shape on the canvas to show its info here.<br>" +
    "To create a new shape, go to the Toolbar tab.</p>";
var objInfoTable = "";  // To build up a table in the sidebar's Object Info tab
var textarea = "";      // Text Area to edit text content of a Kona Text Shape
// var crossOriginProxy =  // A CORS proxy service to access non-CORS images
//     "https://crossorigin.me/"       // THIS IS PROBABLY A SECURITY HOLE 

// All Images must be CORS-compliant, so an in-place data URI, or a remote
// image from a properly configured web server, or provided interactively by the
// user via a file dialog. For more info, see
// https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image

// This fall-back image is internal, so it's always available and CORS-compliant
// From https://icons8.com/icon/1393/image-file
var fallbackImageSrc =
"data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAAAXNSR0IArs4c6QAAAARnQU1B\
AACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMhSURBVGhD7dpJyE5RHMfxV6ZMkSFk\
yKzMY1jJlAWSlY2FMmRh2EgWlBALWbERZSEbJcVCyFjYWCEpQxkjMs/z98d769/\
p3uu99znnPDf51af3Vadzz8/zPs9z77m3oUCmYT/u4iN+\
1uAbbmA5miFqOuMo0hbmw3l0R5R0w02kLcSnOxiM4DmBtAV8wIuS9OeWNudTDEewzIN70DMY\
hVqiV+It3LlFpYYhSI7AHuw4fL2B9eFi57aeYAS85w2Sg/xAP/jKBtgSrucYB2/pAHuAe/\
CZ9bDzp3mJ8fCSvrCTX4XPNKWQqNQE1JyqFBIvr1SVColKjUbpVK2QPEBvlEoVC4nW0RaFE7\
rQOtj5i9iGwgldaAbs/\
EV8RhcUSuhCygro7ONUitO4goew60jMQqHEKNTUTMRr2PXMQaGUKaRLjakIccZ8GHY9QQu1g\
t6oX5GMv4SB8JWDsOsJWmgL7NjEbbSDj0QrpMvzL7BjrVXwkWiFJsOOc+\
2Dj0Qr1B92nGsrfCTqeyhv32EI8tK88effErVQH1yDHf8ei5CXlVDp+b//lZ+\
ohZTWWIZd2IgByIvOmlVGc2tjRB8ueYleqGg2wc6/HXmpdCG9b+\
7Dzq8LuPbISqULzYWdO7EEWalboUno9efXzByDnTtxDlmJXkgbkHugse8wHWnR3l7WVvB36L\
hpiV5oDez4VxgJN3thx7lWIy1RC+\
nL8xPseNGmxiAkmYmsVydxEmmJWijrTEGeYXMju7WcRSe6HeEmWqFa9gayLISbaIUuw47z4Q\
DcRCmU9X1Sq8dwE6XQRdgxPg2FTfBCPaB7RnaML/okdC87orxCY7EUujXv0xS4ifahECv/\
C7n55wppM9xOcAv1zCHY9cxG4djzM+\
2KdkK94j7NUupu3lnYSXajHlkMuw6dybdE4egj1E6k750daIMY0TWWbrno+\
squQ9ddpdICegTMTib6H7qAtPs6vugRnEdwj61ype+\
zKro1ogLuxPWgK9oFqDm68tSdhLSDxKJdIT1M5S1636zFdaQdMBRtd+\
1EVwSLvqP0qunpjlDGoCcKPv3V0PAL/7SQI7ggoMAAAAAASUVORK5CYII=";


var defaultImageSrc =   // Must be CORS-compliant remote image (or ask user via file dialog)
//     fallbackImageSrc;
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/' + 
    'Cc.logo.circle.svg/240px-Cc.logo.circle.svg.png';

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
malesuada.";
// Additional Latin commented out in case it's needed later
/* 
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
nibh sit amet commodo.\
\r\n\
\r\n\
Interdum velit laoreet id donec ultrices tincidunt arcu non. Convallis \
tellus id interdum velit. Tincidunt tortor aliquam nulla facilisi. \
Varius morbi enim nunc faucibus. At imperdiet dui accumsan sit amet. \
Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. \
Cursus sit amet dictum sit amet. Neque viverra justo nec ultrices dui \
sapien eget. Cursus vitae congue mauris rhoncus aenean vel elit \
scelerisque mauris. Risus quis varius quam quisque id diam vel. \
Adipiscing tristique risus nec feugiat in fermentum posuere urna.\
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
sagittis id.\
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
pretium nibh.";
 */

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
    
    // Establish a reference to the modal dialog for error messages
    modal = document.getElementById('myModal');

    /**************************************************************************
    Event-handling functions for the Konva Stage and its Container.
    These are in initApp() since the Stage must be created first.
    **************************************************************************/

    // Three cases on a single click:
    // 1. User has not selected a "new Shape" tool from the sidebar's Toolbar,
    //    and is clicking a blank area to deselect all Shapes
    // 2. User has selected a "new Shape" tool and is placing the new Shape
    // 3. User is selecting an existing Shape to examine/modify it
    stageDraw.on('click', function (e) {
      // If click on empty area and not creating a new shape, then remove all
      // transformers, clear selectedShape, and clear Object Info tab
      if (e.target === stageDraw && GNextShape == "") {
        stageDraw.find('Transformer').destroy();
        layerDraw.draw();
        selectedShape = undefined;
        clearObjectInfo();
        return;
      }

      // At this point the user intends either to create a new shape
      // or select an existing one.
      // Destroy any existing Transformers
      stageDraw.find('Transformer').destroy();

      // Get the position of the mouse
      var pointerPosition = stageDraw.getPointerPosition();

      // First see if the user is creating a new Shape
      var newShape;
      switch(GNextShape){
        case "circle":
          newShape = new Konva.Circle({
            x: pointerPosition.x,
            y: pointerPosition.y,
            radius: 70,
            fill: $c.name2hex('red'),
            fillEnabled: true,
            stroke: $c.name2hex('black'),
            strokeWidth: 4,
            strokeEnabled: true,
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
              fillEnabled: true,
              stroke: $c.name2hex('black'),
              strokeWidth: 4,
              strokeEnabled: true,
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
            fillEnabled: true,
            stroke: $c.name2hex('black'),
            strokeWidth: 4,
            strokeEnabled: true,
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
            fillEnabled: true,
            stroke: $c.name2hex('black'),
            strokeWidth: 4,
            strokeEnabled: true,
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
            strokeEnabled: true,
            lineCap: 'round',
            lineJoin: 'round',
            strokeScaleEnabled: false
          });
          break;
        case "image":
          var imageObj = new Image();
          // To turn this HTML Image into a Data URI later in generateHTML(), as per
          // https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
          // Testing confirms this must be set before setting the HTML Image's src URL
          imageObj.crossOrigin = "Anonymous";

          newShape = new Konva.Image({
            x: pointerPosition.x,
            y: pointerPosition.y,
            image: imageObj,
            width: undefined,               // Take on dimensions of loaded HTML Image
            height: undefined,
            stroke: $c.name2hex('black'),
            strokeWidth: 0,
            strokeEnabled: false,
            strokeScaleEnabled: false
          });
          finishNewShape(newShape);     // Call "early" to assign ID to Konva Image

          // Whenever a new src URL is loaded, clear the Konva Image width/height
          // so it will take on the width/height of the src image, then redraw.
          imageObj.setAttribute('konvaImageID', newShape.id()); // Save ref to Konva Image
          imageObj.onload = function() {

            // "this" is the HTML Image; locate parent Konva Image, clear its width/height
            var konvaImage = stageDraw.findOne('#' + this.getAttribute('konvaImageID'));
            konvaImage.height(undefined);
            konvaImage.width(undefined);

            layerDraw.draw();
            if (konvaImage === selectedShape) {
                // Update the width/height shown in the Object Info tab
                getShapeAttributes(konvaImage);
            }
            this.setAttribute('prevSrc', this.src);
          };
          
          // Catch CORS Exceptions to tell user instead of it just going to console
          imageObj.addEventListener('error', function (e) {
            e.preventDefault(); // Prevent error from getting thrown
            // Display the modal error message
            modal.style.display = "block";
            // Reload prior (hopefully working) image
            this.src = this.getAttribute('prevSrc');
          });
          
          // Setting the HTML Image's src URL will start the image loading
          imageObj.setAttribute('prevSrc', fallbackImageSrc);
          imageObj.src = defaultImageSrc;
//           imageObj.src = crossOriginProxy + defaultImageSrc;
//           imageObj.src = 'icons/image_icon.png';
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
              fill: $c.name2hex('black'),
              fillEnabled: true,
              stroke: $c.name2hex('black'),
              strokeWidth: 0,
              strokeEnabled: false,
              strokeScaleEnabled: false,
              ellipsis: false
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
          if (newShape.getClassName() !== "Image") {
            // For Konva Image, already called finishNewShape above
            finishNewShape(newShape);
          }
          GNextShape="";
          selectedShape = newShape;
      } else {
          selectedShape = e.target;
      }
      
      // Finally, at this point the user has selected a Shape, whether
      // pre-existing or just newly created.

      // Create new transformer
      var tr = new Konva.Transformer();
      tr.rotationSnaps([0, 90, 180, 270]);  // Snap to 90-degree increments
      if (selectedShape.getClassName() == "Text") {
        // Disable rotation for Text shapes
        // TODO Enable rotation for Text shapes when we can figure out the math
        tr.rotateEnabled(false);
      }
      layerDraw.add(tr);
      tr.attachTo(selectedShape);
      layerDraw.draw();
      getShapeAttributes(selectedShape);
      openNav();
      openTab('Object Info', this, 'red');
    });     // End stageDraw.on('click', ...)

    // Keyboard event listener
    container.addEventListener('keydown', function (e) {
      // Destroy selected shape and its transformer
      if (e.keyCode === 8 || e.keyCode === 46) {
        stageDraw.find('Transformer').destroy();
        selectedShape.destroy();
        selectedShape = undefined;
        clearObjectInfo();
      }
      layerDraw.draw();
    });
    
    // 2 event listeners to close the modal error dialog
    // When the user clicks on <span> (x), close the modal
    document.getElementsByClassName("close")[0].onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}   // function initApp()

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
        getShapeAttributes(newShape);
    })

    // When a Transformer is done updating, update the contents of the
    // sidebar's Object Info tab
    newShape.on('transformend', function () {
/* TODO Remove if can't get this "compensation" working
      // Compensate for odd behavior of Konva Transformers that disappear if
      // the mouse is not on Transformer on the transformend event
      stageDraw.find('Transformer').destroy();
      // Create new transformer
      var tr = new Konva.Transformer();
      tr.rotationSnaps([0, 90, 180, 270]);  // Snap to 90-degree increments
      if (this.getClassName() == "Text") {
        // Disable rotation for Text shapes
        // TODO Enable rotation for Text shapes when we can figure out the math
        tr.rotateEnabled(false);
      }
      layerDraw.add(tr);
      tr.attachTo(this);
      layerDraw.draw();
 */

      getShapeAttributes(newShape);
      stageDraw.find('Transformer').forceUpdate();
      layerDraw.draw();
    });

    // When starting to drag a Shape, move it to the top of the Z ordering
    newShape.on("dragstart", function() {
        this.moveToTop();
//         layerDraw.draw();
    });

    // When done dragging a shape, update the contents of the Object Info tab
    newShape.on('dragmove', function() {
        getShapeAttributes(newShape);
    });


    // Set the pointer to clarify when a shape can be dragged
    newShape.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
    });
    newShape.on('mouseout', function() {
        document.body.style.cursor = 'default';
    });

    setShapeID(newShape);
    layerDraw.add(newShape);
    layerDraw.draw();
    newShape.draggable(true);
}   // finishNewShape(newShape)

// Get the attributes of the selected shape and show on the Object Info tab
function getShapeAttributes(shape) {
  // When shape selected will change Object Info content to that shape's
  // specific attributes
  var isShapeValid = true;
  objInfoTable = "<h1>Object Info</h1>" +
    "<p>Hold Alt while dragging a handle to transform from the center</p>" +
    "<table class=\"objInfoTable\"><tbody>";
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
      createShapeAttributeString(shape, "Shape Outline Enabled (true/false): ", "strokeEnabled", "checkbox");
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
      createShapeAttributeString(shape, "Shape Outline Enabled (true/false): ", "strokeEnabled", "checkbox");
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
      createShapeAttributeString(shape, "Shape Outline Enabled (true/false): ", "strokeEnabled", "checkbox");
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
      createShapeAttributeString(shape, "Shape Outline Enabled (true/false): ", "strokeEnabled", "checkbox");
      break;
    // TODO //
    case "Line":
      createShapeAttributeString(shape, "ID (Make Unique): ", "id");
      //createShapeAttributeString(shape, "X-Position (Left most point): ", "x", "number");
      //createShapeAttributeString(shape, "Y-Position (Left most point): ", "y", "number");
      createShapeAttributeString(shape, "Points (x1, y1, x2, y2, etc.): ", "points");
      createShapeAttributeString(shape, "Line Join Point Shape (miter, round, or bevel): ", "lineJoin");
      createShapeAttributeString(shape, "Line End Shape (butt, round, or square): ", "lineCap");
//       createShapeAttributeString(shape, "Scale-X: ", "scaleX", "number", "readonly");
//       createShapeAttributeString(shape, "Scale-Y: ", "scaleY", "number", "readonly");
      //createShapeAttributeString(shape, "width: ", "width", "number", "readonly");
      //createShapeAttributeString(shape, "height: ", "height", "number", "readonly");
      createShapeAttributeString(shape, "Rotation (Degrees): ", "rotation", "number");
      //createShapeAttributeString(shape, "Fill Color: ", "fill", "color");
      //createShapeAttributeString(shape, "Fill Enabled (true/false): ", "fillEnabled", "checkbox");
      createShapeAttributeString(shape, "Line Color: ", "stroke", "color");
      createShapeAttributeString(shape, "Line Width: ", "strokeWidth", "number");
      createShapeAttributeString(shape, "Line Width Enabled (true/false): ", "strokeEnabled", "checkbox");
      break;
    case "Image":
      createShapeAttributeString(shape, "ID (Make Unique): ", "id");
      createShapeAttributeString(shape, "Image URL: ", "image");
      createShapeAttributeString(shape, "X-Position: ", "x", "number");
      createShapeAttributeString(shape, "Y-Position: ", "y", "number");
//       createShapeAttributeString(shape, "Scale-X: ", "scaleX", "number", "readonly");
//       createShapeAttributeString(shape, "Scale-Y: ", "scaleY", "number", "readonly");
      createShapeAttributeString(shape, "width: ", "width", "number");
      createShapeAttributeString(shape, "height: ", "height", "number");
      createShapeAttributeString(shape, "Rotation (Degrees): ", "rotation", "number");
      createShapeAttributeString(shape, "Shape Outline Color: ", "stroke", "color");
      createShapeAttributeString(shape, "Shape Outline Width: ", "strokeWidth", "number");
      createShapeAttributeString(shape, "Shape Outline Enabled (true/false): ", "strokeEnabled", "checkbox");
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
      createShapeAttributeString(shape, "Text Color: ", "fill", "color");
      createShapeAttributeString(shape, "Fill Enabled (true/false): ", "fillEnabled", "checkbox");
      createShapeAttributeString(shape, "Text Outline Color: ", "stroke", "color");
      createShapeAttributeString(shape, "Text Outline Width: ", "strokeWidth", "number");
      createShapeAttributeString(shape, "Text Outline Enabled (true/false): ", "strokeEnabled", "checkbox");
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
      // Special handling for a text edit box below
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

  // If a valid shape was found, update the Object Info tab with the
  // <table> with editing widgets, a place to edit Text objects,
  // an Update button, etc.
  if (isShapeValid) {
    objInfoTable += "</tbody></table><br>";
    var objInfo = document.getElementById("Object Info");
    objInfo.innerHTML = objInfoTable;
    if (shape.getClassName() == "Text") {
        // Special handling for a text edit box
        textarea = document.createElement('textarea');
        textarea.value = shape.getAttr("text");
        textarea.style.width = "400px";
        textarea.setAttribute("id", shape.id() + "textarea");

        objInfo.insertAdjacentHTML('beforeend', "Text:<br>");
        objInfo.appendChild(textarea);
        objInfo.insertAdjacentHTML('beforeend', "<br>");
        objInfo.insertAdjacentHTML('beforeend', "<br>");
    }
    // Convert selected local image filename to URL and place it in URL edit box
    // Based on an idea at https://stackoverflow.com/a/21790019
    if (shape.getClassName() == "Image") {
        document.getElementById("fileInput").onchange = function(e) {
            var URL = window.webkitURL || window.URL;
            var url = URL.createObjectURL(e.target.files[0]);
            document.getElementById(shape.id() + "image").setAttribute("value", url);
        };
    }
    var btn = document.createElement("BUTTON");
    btn.setAttribute("class", "updatebtn");
    var t = document.createTextNode("Update");
    btn.appendChild(t);
    objInfo.appendChild(btn);
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
//
// Format overall Object Info tab content as a table.
// createShapeAttributeString writes one row, with surrounding <table> text
// supplied by caller. Potential layout:
// <table class="objInfoTable">
//     <tr>
//         <td class="leftCol">label</td>
//         <td class="rightCol">input text/checkbox/etc.</td>
//     </tr>
//     ...
// </table>

function createShapeAttributeString(shape, string, value, inputType, readonly) {
  if (inputType === undefined) {
    inputType = "text";
  }
  var tempBox = document.createElement('INPUT');
  tempBox.setAttribute("type", inputType);
  if (inputType === "checkbox") {
    tempBox.setAttribute("checked", "checked");
    if (shape.getAttr(value) == "false"
        || shape.getAttr(value) == false) {
      tempBox.removeAttribute("checked");   // Work around String vs. Boolean issue
    }
  } else {
    tempBox.setAttribute("value", shape.getAttr(value));
    if (value == "image") {
      tempBox.setAttribute("value", shape.getImage().src);
    }
  }
  tempBox.setAttribute("id", shape.id() + value);
  if (readonly) {
    tempBox.setAttribute("readonly", "true");
  }

  var rowPrefix = "<tr><td class=\"leftCol\">";
  var rowMiddle = "</td><td class=\"rightCol\">";
  var rowSuffix = "</td></tr>"
  objInfoTable += rowPrefix + string + rowMiddle + tempBox.outerHTML + rowSuffix;
  
  // For Images, add an extra button to allow selecting a local image file
  if (value == "image") {
      objInfoTable += rowPrefix + "Use a local image file: " + rowMiddle +
      "<input type=\"file\" id=\"fileInput\">"
      + rowSuffix;
  }
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
      // fillEnabled is a checkbox so must use "checked" instead of "value"
      shape.setAttr("fillEnabled", document.getElementById(shape.id() + "fillEnabled").checked);
      shape.setAttr("stroke", document.getElementById(shape.id() + "stroke").value);
      shape.setAttr("strokeWidth", +(document.getElementById(shape.id() + "strokeWidth").value));
      // strokeEnabled is a checkbox so must use "checked" instead of "value"
      shape.setAttr("strokeEnabled", document.getElementById(shape.id() + "strokeEnabled").checked);
      break;
    case "Rect":
      shape.setAttr("id", document.getElementById(shape.id() + "id").value);
      shape.setAttr("x", +(document.getElementById(shape.id() + "x").value));
      shape.setAttr("y", +(document.getElementById(shape.id() + "y").value));
      //       shape.setAttr("scaleX", +(document.getElementById(shape.id() + "scaleX").value));
      //       shape.setAttr("scaleY", +(document.getElementById(shape.id() + "scaleY").value));
      shape.setAttr("width", +(document.getElementById(shape.id() + "width").value));
      shape.setAttr("height", +(document.getElementById(shape.id() + "height").value));
      shape.setAttr("rotation", +(document.getElementById(shape.id() + "rotation").value));
      shape.setAttr("fill", document.getElementById(shape.id() + "fill").value);
      // fillEnabled is a checkbox so must use "checked" instead of "value"
      shape.setAttr("fillEnabled", document.getElementById(shape.id() + "fillEnabled").checked);
      shape.setAttr("stroke", document.getElementById(shape.id() + "stroke").value);
      shape.setAttr("strokeWidth", +(document.getElementById(shape.id() + "strokeWidth").value));
      // strokeEnabled is a checkbox so must use "checked" instead of "value"
      shape.setAttr("strokeEnabled", document.getElementById(shape.id() + "strokeEnabled").checked);
      break;
    case "Ellipse":
      shape.setAttr("id", document.getElementById(shape.id() + "id").value);
      shape.setAttr("x", +(document.getElementById(shape.id() + "x").value));
      shape.setAttr("y", +(document.getElementById(shape.id() + "y").value));
      //       shape.setAttr("scaleX", +(document.getElementById(shape.id() + "scaleX").value));
      //       shape.setAttr("scaleY", +(document.getElementById(shape.id() + "scaleY").value));
      shape.setAttr("width", +(document.getElementById(shape.id() + "width").value));
      shape.setAttr("height", +(document.getElementById(shape.id() + "height").value));
      shape.setAttr("rotation", +(document.getElementById(shape.id() + "rotation").value));
      shape.setAttr("radiusX", +(document.getElementById(shape.id() + "radiusX").value));
      shape.setAttr("radiusY", +(document.getElementById(shape.id() + "radiusY").value));
      shape.setAttr("fill", document.getElementById(shape.id() + "fill").value);
      // fillEnabled is a checkbox so must use "checked" instead of "value"
      shape.setAttr("fillEnabled", document.getElementById(shape.id() + "fillEnabled").checked);
      shape.setAttr("stroke", document.getElementById(shape.id() + "stroke").value);
      shape.setAttr("strokeWidth", +(document.getElementById(shape.id() + "strokeWidth").value));
      // strokeEnabled is a checkbox so must use "checked" instead of "value"
      shape.setAttr("strokeEnabled", document.getElementById(shape.id() + "strokeEnabled").checked);
      break;
    case "Wedge":
      shape.setAttr("id", document.getElementById(shape.id() + "id").value);
      shape.setAttr("x", +(document.getElementById(shape.id() + "x").value));
      shape.setAttr("y", +(document.getElementById(shape.id() + "y").value));
      //       shape.setAttr("scaleX", +(document.getElementById(shape.id() + "scaleX").value));
      //       shape.setAttr("scaleY", +(document.getElementById(shape.id() + "scaleY").value));
      shape.setAttr("width", +(document.getElementById(shape.id() + "width").value));
      shape.setAttr("height", +(document.getElementById(shape.id() + "height").value));
      shape.setAttr("rotation", +(document.getElementById(shape.id() + "rotation").value));
      shape.setAttr("angle", +(document.getElementById(shape.id() + "angle").value));
      shape.setAttr("radius", +(document.getElementById(shape.id() + "radius").value));
      shape.setAttr("fill", document.getElementById(shape.id() + "fill").value);
      // fillEnabled is a checkbox so must use "checked" instead of "value"
      shape.setAttr("fillEnabled", document.getElementById(shape.id() + "fillEnabled").checked);
      shape.setAttr("stroke", document.getElementById(shape.id() + "stroke").value);
      shape.setAttr("strokeWidth", +(document.getElementById(shape.id() + "strokeWidth").value));
      // strokeEnabled is a checkbox so must use "checked" instead of "value"
      shape.setAttr("strokeEnabled", document.getElementById(shape.id() + "strokeEnabled").checked);
      break;
    // TODO //
    case "Line":
      shape.setAttr("id", document.getElementById(shape.id() + "id").value);
      shape.points(document.getElementById(shape.id() + "points").value.split(",").map(Number));
      shape.setAttr("lineJoin", document.getElementById(shape.id() + "lineJoin").value);
      shape.setAttr("lineCap", document.getElementById(shape.id() + "lineCap").value);
      //shape.setAttr("width", +(document.getElementById(shape.id() + "width").value));
      //shape.setAttr("height", +(document.getElementById(shape.id() + "height").value));
      shape.setAttr("rotation", +(document.getElementById(shape.id() + "rotation").value));
      shape.setAttr("stroke", document.getElementById(shape.id() + "stroke").value);
      shape.setAttr("strokeWidth", +(document.getElementById(shape.id() + "strokeWidth").value));
      // strokeEnabled is a checkbox so must use "checked" instead of "value"
      shape.setAttr("strokeEnabled", document.getElementById(shape.id() + "strokeEnabled").checked);
      break;
    case "Image":
      shape.setAttr("id", document.getElementById(shape.id() + "id").value);
      //shape.setAttr("image", document.getElementById(shape.id() + "image").value);
      shape.getImage().src = document.getElementById(shape.id() + "image").value;
      shape.setAttr("x", +(document.getElementById(shape.id() + "x").value));
      shape.setAttr("y", +(document.getElementById(shape.id() + "y").value));
      //       shape.setAttr("scaleX", +(document.getElementById(shape.id() + "scaleX").value));
      //       shape.setAttr("scaleY", +(document.getElementById(shape.id() + "scaleY").value));
      shape.setAttr("width", +(document.getElementById(shape.id() + "width").value));
      shape.setAttr("height", +(document.getElementById(shape.id() + "height").value));
      shape.setAttr("rotation", +(document.getElementById(shape.id() + "rotation").value));
      shape.setAttr("stroke", document.getElementById(shape.id() + "stroke").value);
      shape.setAttr("strokeWidth", +(document.getElementById(shape.id() + "strokeWidth").value));
      // strokeEnabled is a checkbox so must use "checked" instead of "value"
      shape.setAttr("strokeEnabled", document.getElementById(shape.id() + "strokeEnabled").checked);
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
      shape.width(+(document.getElementById(shape.id() + "width").value));
      shape.height(+(document.getElementById(shape.id() + "height").value));
      shape.setAttr("rotation", +(document.getElementById(shape.id() + "rotation").value));
      shape.setAttr("fill", document.getElementById(shape.id() + "fill").value);
      // fillEnabled is a checkbox so must use "checked" instead of "value"
      shape.setAttr("fillEnabled", document.getElementById(shape.id() + "fillEnabled").checked);
      shape.setAttr("stroke", document.getElementById(shape.id() + "stroke").value);
      shape.setAttr("strokeWidth", +(document.getElementById(shape.id() + "strokeWidth").value));
      // strokeEnabled is a checkbox so must use "checked" instead of "value"
      shape.setAttr("strokeEnabled", document.getElementById(shape.id() + "strokeEnabled").checked);
      shape.setAttr("fontFamily", document.getElementById(shape.id() + "fontFamily").value);
      shape.setAttr("fontSize", +(document.getElementById(shape.id() + "fontSize").value));
      shape.setAttr("fontStyle", document.getElementById(shape.id() + "fontStyle").value);
      shape.setAttr("fontVariant", document.getElementById(shape.id() + "fontVariant").value);
      shape.setAttr("align", document.getElementById(shape.id() + "align").value);
      shape.setAttr("verticalAlign", document.getElementById(shape.id() + "verticalAlign").value);
      shape.setAttr("padding", +(document.getElementById(shape.id() + "padding").value));
      shape.setAttr("lineHeight", +(document.getElementById(shape.id() + "lineHeight").value));
      shape.setAttr("wrap", document.getElementById(shape.id() + "wrap").value);
      // ellipsis is a checkbox so must use "checked" instead of "value"
      shape.setAttr("ellipsis", document.getElementById(shape.id() + "ellipsis").checked);
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
}   // setSelectedShapeAttributes(shape)

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
        "    <title>" + defaultPageTitle + "</title>\n" +
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
    selectedShape = undefined;
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
            "        <p id=\"" + ParaID + "\">" +
                        shape.getAttr("text")
                            .replace(/\r\n/g, "<br>")   // Replace \r\n pairs, then
                            .replace(/\n/g, "<br>") +   // replace remaining single \n's
                    "</p>\n" +
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
        // https://www.w3schools.com/cssref/pr_pos_overflow.asp
        // https://css-tricks.com/almanac/properties/t/text-overflow/

        // Some attributes must be applied to the <p> instead of the
        // surrounding <div>.
        // The mapping between Konva wrap/scroll/etc. behavior and CSS
        // behaviors is not perfect.
        // Start with default values that match Konva, not necessarily CSS.

        var wordwrap =                                      // CSS default is normal
                    "            word-wrap: normal;\n";
        var whitespace =                                    // CSS default is normal
                    "            white-space: normal;\n";
        var overflow =                                      // CSS default is visible
                    "            overflow: hidden;\n";
        var textoverflow =                                  // CSS default is clip
                    "            text-overflow: clip;\n";
        var wordbreak =                                     // CSS default is normal
                    "            word-break: normal;\n";

        // "Translate" Konva Text attributes as well as possible to CSS
        // if (shape.getAttr("wrap") == "char") then use values above
        if (shape.getAttr("wrap") == "char") {
            wordwrap =
                    "            word-wrap: break-word;\n"
            wordbreak =
                    "            word-break: break-all;\n";
        } else if (shape.getAttr("wrap") == "none") {
            whitespace =
                    "            white-space: nowrap;\n";
            if (shape.getAttr("ellipsis")) {
                overflow =
                    "            overflow: hidden;\n";      //TODO ???
                textoverflow =
                    "            text-overflow: ellipsis;\n";
            }
        }

        var paraCSS =
                    "        #" + ParaID + " {\n" +
                    "            margin-top: 0;\n" +
                    wordwrap + whitespace + overflow + textoverflow + wordbreak +
                    "        }\n";

        // Get left/x and top/y position of Text, including any transforms
        var boundingRect = shape.getClientRect();

        // TODO Text color is fill/fillEnabled, Text outline is stroke/strokeWidth
        styles += encodeURIComponent(
            "        #" + shape.getAttr("id") + " {\n" +
            "            position: absolute;\n" +
//             "            left: " + boundingRect.x + "px;\n" +
//             "            top: " + boundingRect.y + "px;\n" +
            "            z-index: " + shape.getAbsoluteZIndex() + ";\n" +
            "            left: " + shape.getAttr("x") + "px;\n" +
            "            top: " + shape.getAttr("y") + "px;\n" +
            "            width: " + shape.getAttr("width") + "px;\n" +
            "            height: " + shape.getAttr("height") + "px;\n" +
            "            transform: rotate(" + shape.getAttr("rotation") + "deg);\n" +
            "            color: " + shape.getAttr("fill") + ";\n" +
            "            font-family: \"" + shape.getAttr("fontFamily") + "\", monospace;\n" +
            "            font-size: " + shape.getAttr("fontSize") + "px;\n" +
            "            font-style: " + shape.getAttr("fontStyle") + ";\n" +
            "            font-variant: " + shape.getAttr("fontVariant") + ";\n" +
            "            text-align: " + shape.getAttr("align") + ";\n" +
            "            vertical-align: " + shape.getAttr("verticalAlign") + ";\n" +
            "            padding: " + shape.getAttr("padding") + ";\n" +
            "            line-height: " + shape.getAttr("lineHeight") + ";\n" +
            "            overflow: auto;\n" +
            "        }\n" +
            paraCSS
        );
    });

    // toDataURL() returns a base64 encoded URI something like:
    //      data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+...
    // API reference: https://konvajs.github.io/api/Konva.Stage.html#toDataURL__anchor

    // Collect image and style info for all Shapes other than Text in the stage
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
            );
            // For Konva Images, the underlying HTML Image being CORS compliant
            bodyHTML += shape.toDataURL();
            bodyHTML += encodeURIComponent("\"/>\n" +
                "    </div>\n"
            );

            // Get left/x and top/y position of shape, including any transforms
            var boundingRect = shape.getClientRect();

            // CSS positioning: https://www.elated.com/articles/css-positioning/
            styles += encodeURIComponent(
                "        #" + shape.getAttr("id") + " {\n" +
                "            position: absolute;\n" +
                "            z-index: " + shape.getAbsoluteZIndex() + ";\n" +
                "            left: " + boundingRect.x + "px;\n" +
                "            top: " + boundingRect.y + "px;\n" +
                "        }\n"
            );
        }
    });

//     alert("continue");              // For debug: link.click() in downloadURI clears console!
    downloadURI("data:text/html," +
        prefixHead + styles + suffixHead +
        prefixBody + bodyHTML + suffixBody, 'stage.html');
}   // End generateHTML()

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
