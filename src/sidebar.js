// Global variables //
// variable for next shape to be drawn on the canvas
var GNextShape = "";
var selectedShape;

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
    elmnt.style.backgroundColor = color;
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
  document.getElementById("Object Info").innerHTML = "<h1>Object Info</h1>";
  switch(shape.getClassName()){
    case "Circle":
      createShapeAttributeString("ID (Make Unique): ", "id");
      createShapeAttributeString("X-Position (Center of Circle): ", "x");
      createShapeAttributeString("Y-Position (Center of Circle): ", "y");
      createShapeAttributeString("Scale-X: ", "scaleX");
      createShapeAttributeString("Scale-Y: ", "scaleY");
      createShapeAttributeString("width: ", "width");
      createShapeAttributeString("height: ", "height");
      createShapeAttributeString("Rotation (Degrees): ", "rotation");
      createShapeAttributeString("Radius (Pixels): ", "radius");
      createShapeAttributeString("Fill Color: ", "fill");
      createShapeAttributeString("Fill Enabled (true/false): ", "fillEnabled");
      createShapeAttributeString("Shape Outline Color: ", "stroke");
      createShapeAttributeString("Shape Outline Width: ", "strokeWidth");
      break;
    case "Rect":
      // Create string/textbox combo for Object Info tab when shape selected
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
      // DEBUG //
      //document.getElementById("Object Info").insertAdjacentHTML('beforeend', "Hello");
      break;
    case "Ellipse":
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
      break;
    case "Wedge":
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
      break;
    // TODO //
    case "Line":
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
      break;
    case "Image":
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
      break;
    case "Arrow":
      break;
    case "Label":
      break;
    case "Star":
      break;
    case "Ring":
      break;
    case "Arc":
      break;
    case "RegularPolygon":
      break;
    default:
      alert("Shape not valid");
      break;
  }
}

// Dynamically add string/textbox value to the  Object Info tab
function createShapeAttributeString(string, value) {
  var tempBox = document.createElement('INPUT');
  tempBox.setAttribute("type", "text");
  tempBox.setAttribute("value", selectedShape.getAttr(value));
  document.getElementById("Object Info").insertAdjacentHTML('beforeend', string);
  document.getElementById("Object Info").appendChild(tempBox);
  document.getElementById("Object Info").insertAdjacentHTML('beforeend', "<br>");
  document.getElementById("Object Info").insertAdjacentHTML('beforeend', "<br>");
}

// Set what will be shown on the Object Info tab
function setObjectInfo(shape) {
  getShapeAttributes(shape);
}

// TODO //
// Will take the values from the textboxes in Object Info
// to change selected shape When "Update" button is clicked
function setSelectedShapeAttributes(shape) {

}
