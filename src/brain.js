var canvasWidth = 600;
var canvasHeight = 400;

var stage = new Konva.Stage({
  container: "example",
  width: canvasWidth,
  height: canvasHeight
});

var layerA = new Konva.Layer();

var polyA = new Konva.RegularPolygon({
  x: 125,
  y: 125,
  sides: 6,
  radius: 80,
  fill: "yellow",
  stroke: "black",
  strokeWidth: 5
});

var circA = new Konva.Circle({
  x: 275,
  y: 225,
  height: 100,
  fill: "orange",
  stroke: "black"
});

var circB = new Konva.Circle({
  x: 475,
  y: 275,
  radius: 100,
  fill: "red",
  stroke: "black"
});

layerA.add(polyA, circA, circB);

stage.add(layerA);

polyA.on("mousedown", function() {
  polyA.sides(polyA.sides() + 1);
  layerA.draw();
});

polyA.on("mouseleave", function() {
  var totalSides = polyA.sides();
  if(totalSides > 3) {
    polyA.sides(polyA.sides() - 1);
  }
  layerA.draw();
});

circA.on("mouseover", function() {
  circA.strokeWidth(10);
  layerA.draw();
});

circA.on("mouseup", function() {
  circA.strokeWidth(5);
  layerA.draw();
});

circB.on("mouseenter", function() {
  stage.container().style.cursor = "crosshair";
});

circB.on("mouseleave", function() {
  stage.container().style.cursor = "default";
});

circB.on("mousemove", function() {
  var pointerPos = stage.getPointerPosition();
  var r = pointerPos.x % 255;
  var g = pointerPos.y % 255;
  circB.fill("rgb(" + r + ", " + g + ", 100)");
  layerA.draw();
});
