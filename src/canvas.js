function selectObject(object, stage) {

}

function placeObject(object, stage) {

}

function handleMouseDown(ev) {
  /* Get current mouse position */
  mouseX=parseInt(ev.clientX-offsetX);
  mouseY=parseInt(ev.clientY-offsetY);

  /* Save the last current position of mouse */
  lastX=mouseX;
  lastY=mouseY;

  /* Set the mouseIsDown flag */
  mouseIsDown=true;
}

function handleMouseUp(ev) {
  /* Clear the mouseIsDown flag */
  mouseIsDown=false;
}

function handleMouseMove(ev) {
  if(!mouseIsDown) {return;}

  /* Get current mouse position */
  mouseX=parseInt(ev.clientX-offsetX);
  mouseY=parseInt(ev.clientY-offsetY);
}
