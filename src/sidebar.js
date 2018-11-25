// Global variables //
// variable for next shape to be drawn on the canvas
var GNextShape = "";
var selectedShape;
var nextShapeID = 1;

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

    // Add the specific color to the button used to open the tab content
    // TODO this shows an error in the console: TypeError: elmnt.style is undefined
//     elmnt.style.backgroundColor = color;
}

// Click on element (assumed to be a button) with id="defaultOpen"
function clickDefaultButton() {
  document.getElementById("defaultOpen").click();
}

// Set GNextShape to draw
function setShape(shape) {
  GNextShape = shape;
}

// Get the attributes of the selected shape to get show on the Object Info tab
function getShapeAttributes(shape) {
  // When shape selected will change Object Info content to that shape's
  // specific attributes
  var isShapeValid = true;
  document.getElementById("Object Info").innerHTML = "<h1>Object Info</h1>";
  switch(shape.getClassName()){
    case "Circle":
      createShapeAttributeString(shape, "ID (Make Unique): ", "id");
      createShapeAttributeString(shape, "X-Position (Center of Circle): ", "x");
      createShapeAttributeString(shape, "Y-Position (Center of Circle): ", "y");
      createShapeAttributeString(shape, "Scale-X: ", "scaleX");
      createShapeAttributeString(shape, "Scale-Y: ", "scaleY");
      createShapeAttributeString(shape, "width: ", "width");
      createShapeAttributeString(shape, "height: ", "height");
      createShapeAttributeString(shape, "Rotation (Degrees): ", "rotation");
      createShapeAttributeString(shape, "Radius (Pixels): ", "radius");
      createShapeAttributeString(shape, "Fill Color: ", "fill");
      createShapeAttributeString(shape, "Fill Enabled (true/false): ", "fillEnabled");
      createShapeAttributeString(shape, "Shape Outline Color: ", "stroke");
      createShapeAttributeString(shape, "Shape Outline Width: ", "strokeWidth");
      break;
    case "Rect":
      // Create string/textbox combo for Object Info tab when shape selected
      createShapeAttributeString(shape, "ID (Make Unique): ", "id");
      createShapeAttributeString(shape, "X-Position: ", "x");
      createShapeAttributeString(shape, "Y-Position: ", "y");
      createShapeAttributeString(shape, "Scale-X: ", "scaleX");
      createShapeAttributeString(shape, "Scale-Y: ", "scaleY");
      createShapeAttributeString(shape, "width: ", "width");
      createShapeAttributeString(shape, "height: ", "height");
      createShapeAttributeString(shape, "Rotation (Degrees): ", "rotation");
      createShapeAttributeString(shape, "Fill Color: ", "fill");
      createShapeAttributeString(shape, "Fill Enabled (true/false): ", "fillEnabled");
      createShapeAttributeString(shape, "Shape Outline Color: ", "stroke");
      createShapeAttributeString(shape, "Shape Outline Width: ", "strokeWidth");
      // DEBUG //
      //document.getElementById("Object Info").insertAdjacentHTML('beforeend', "Hello");
      break;
    case "Ellipse":
      createShapeAttributeString(shape, "ID (Make Unique): ", "id");
      createShapeAttributeString(shape, "X-Position (Center of Circle): ", "x");
      createShapeAttributeString(shape, "Y-Position (Center of Circle): ", "y");
      createShapeAttributeString(shape, "Scale-X: ", "scaleX");
      createShapeAttributeString(shape, "Scale-Y: ", "scaleY");
      createShapeAttributeString(shape, "width: ", "width");
      createShapeAttributeString(shape, "height: ", "height");
      createShapeAttributeString(shape, "Rotation (Degrees): ", "rotation");
      createShapeAttributeString(shape, "Radius X (Pixels): ", "radiusX");
      createShapeAttributeString(shape, "Radius Y (Pixels): ", "radiusY");
      createShapeAttributeString(shape, "Fill Color: ", "fill");
      createShapeAttributeString(shape, "Fill Enabled (true/false): ", "fillEnabled");
      createShapeAttributeString(shape, "Shape Outline Color: ", "stroke");
      createShapeAttributeString(shape, "Shape Outline Width: ", "strokeWidth");
      break;
    case "Wedge":
      createShapeAttributeString(shape, "ID (Make Unique): ", "id");
      createShapeAttributeString(shape, "X-Position (Center of Ellipse): ", "x");
      createShapeAttributeString(shape, "Y-Position (Center of Ellipse): ", "y");
      createShapeAttributeString(shape, "Scale-X: ", "scaleX");
      createShapeAttributeString(shape, "Scale-Y: ", "scaleY");
      createShapeAttributeString(shape, "width: ", "width");
      createShapeAttributeString(shape, "height: ", "height");
      createShapeAttributeString(shape, "Rotation (Degrees): ", "rotation");
      createShapeAttributeString(shape, "Angle (Degrees): ", "angle");
      createShapeAttributeString(shape, "Radius (Pixels): ", "radius");
      createShapeAttributeString(shape, "Fill Color: ", "fill");
      createShapeAttributeString(shape, "Fill Enabled (true/false): ", "fillEnabled");
      createShapeAttributeString(shape, "Shape Outline Color: ", "stroke");
      createShapeAttributeString(shape, "Shape Outline Width: ", "strokeWidth");
      break;
    // TODO //
    case "Line":
      createShapeAttributeString(shape, "ID (Make Unique): ", "id");
      //createShapeAttributeString(shape, "X-Position (Left most point): ", "x");
      //createShapeAttributeString(shape, "Y-Position (Left most point): ", "y");
      createShapeAttributeString(shape, "Points: ", "points");
      createShapeAttributeString(shape, "Line Join Point Shape (miter, round, or bevel): ", "lineJoin");
      createShapeAttributeString(shape, "Line End Shape (butt, round, or square): ", "lineCap");
      createShapeAttributeString(shape, "Scale-X: ", "scaleX");
      createShapeAttributeString(shape, "Scale-Y: ", "scaleY");
      createShapeAttributeString(shape, "width: ", "width");
      createShapeAttributeString(shape, "height: ", "height");
      createShapeAttributeString(shape, "Rotation (Degrees): ", "rotation");
      //createShapeAttributeString(shape, "Fill Color: ", "fill");
      //createShapeAttributeString(shape, "Fill Enabled (true/false): ", "fillEnabled");
      createShapeAttributeString(shape, "Line Color: ", "stroke");
      createShapeAttributeString(shape, "Line Width: ", "strokeWidth");
      break;
    case "Image":
      createShapeAttributeString(shape, "ID (Make Unique): ", "id");
      createShapeAttributeString(shape, "Image File Name: ", "image");
      createShapeAttributeString(shape, "X-Position (Center of Image): ", "x");
      createShapeAttributeString(shape, "Y-Position (Center of Image): ", "y");
      createShapeAttributeString(shape, "Scale-X: ", "scaleX");
      createShapeAttributeString(shape, "Scale-Y: ", "scaleY");
      createShapeAttributeString(shape, "width: ", "width");
      createShapeAttributeString(shape, "height: ", "height");
      createShapeAttributeString(shape, "Rotation (Degrees): ", "rotation");
      createShapeAttributeString(shape, "Shape Outline Color: ", "stroke");
      createShapeAttributeString(shape, "Shape Outline Width: ", "strokeWidth");
      break;
    case "Arrow":
      isShapeValid = false;
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
    document.getElementById("Object Info").insertAdjacentHTML('beforeend', "<p>Double-click an existing shape on the canvas to show its info here</p>");
  }
}

// Dynamically add string/textbox value to the  Object Info tab
function createShapeAttributeString(shape, string, value) {
  var tempBox = document.createElement('INPUT');
  tempBox.setAttribute("type", "text");
  tempBox.setAttribute("value", selectedShape.getAttr(value));
  tempBox.setAttribute("id", shape.id() + value);
  document.getElementById("Object Info").insertAdjacentHTML('beforeend', string);
  document.getElementById("Object Info").appendChild(tempBox);
  document.getElementById("Object Info").insertAdjacentHTML('beforeend', "<br>");
  document.getElementById("Object Info").insertAdjacentHTML('beforeend', "<br>");
}

// Set what will be shown on the Object Info tab
function setObjectInfo(shape) {
  getShapeAttributes(shape);
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
// to change selected shape When "Update" button is clicked
function setSelectedShapeAttributes(shape) {
//   alert("Update " + shape.getClassName() + " ID: " + shape.id());   // TODO Remove
//   console.log(document.getElementById(shape.id() + "id").value);    // TODO Remove
//   console.log(document.getElementById(shape.id() + "x").value);     // TODO Remove
//   console.log(document.getElementById(shape.id() + "y").value);     // TODO Remove
  var isShapeValid = true;
  switch(shape.getClassName()){
    case "Circle":
      shape.setAttr("id", document.getElementById(shape.id() + "id").value);
      shape.setAttr("x", document.getElementById(shape.id() + "x").value);
      shape.setAttr("y", document.getElementById(shape.id() + "y").value);
      shape.setAttr("scaleX", document.getElementById(shape.id() + "scaleX").value);
      shape.setAttr("scaleY", document.getElementById(shape.id() + "scaleY").value);
      shape.setAttr("width", document.getElementById(shape.id() + "width").value);
      shape.setAttr("height", document.getElementById(shape.id() + "height").value);
      shape.setAttr("rotation", document.getElementById(shape.id() + "rotation").value);
      shape.setAttr("radius", document.getElementById(shape.id() + "radius").value);
      shape.setAttr("fill", document.getElementById(shape.id() + "fill").value);
      shape.setAttr("fillEnabled", document.getElementById(shape.id() + "fillEnabled").value);
      shape.setAttr("stroke", document.getElementById(shape.id() + "stroke").value);
      shape.setAttr("strokeWidth", document.getElementById(shape.id() + "strokeWidth").value);
      break;
    case "Rect":
      // Create string/textbox combo for Object Info tab when shape selected
/* 
      createShapeAttributeString("ID (Make Unique): ", "id");
      createShapeAttributeString("X-Position: ", "x");
      createShapeAttributeString("Y-Position: ", "y");
      createShapeAttributeString("Scale-X: ", "scaleX");
      createShapeAttributeString("Scale-Y: ", "scaleY");
      createShapeAttributeString("width: ", "width");
      createShapeAttributeString("height: ", "height");
      createShapeAttributeString("Rotation (Degrees): ", "rotation");
      createShapeAttributeString("Fill Color: ", "fill");
      createShapeAttributeString("Fill Enabled (true/false): ", "fillEnabled");
      createShapeAttributeString("Shape Outline Color: ", "stroke");
      createShapeAttributeString("Shape Outline Width: ", "strokeWidth");
 */
      // DEBUG //
      //document.getElementById("Object Info").insertAdjacentHTML('beforeend', "Hello");
      break;
    case "Ellipse":
/* 
      createShapeAttributeString("ID (Make Unique): ", "id");
      createShapeAttributeString("X-Position (Center of Circle): ", "x");
      createShapeAttributeString("Y-Position (Center of Circle): ", "y");
      createShapeAttributeString("Scale-X: ", "scaleX");
      createShapeAttributeString("Scale-Y: ", "scaleY");
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
      createShapeAttributeString("Scale-X: ", "scaleX");
      createShapeAttributeString("Scale-Y: ", "scaleY");
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
      createShapeAttributeString("Scale-X: ", "scaleX");
      createShapeAttributeString("Scale-Y: ", "scaleY");
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
      createShapeAttributeString("Scale-X: ", "scaleX");
      createShapeAttributeString("Scale-Y: ", "scaleY");
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
    layerDraw.draw();
  }
}
