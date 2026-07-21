let mouseX = 0,
mouseY = 0,
mouseDownX = 0.
mouseDownY = 0,
oldOffX = 0;
oldOffY = 0;
mouseUnclaimed = false;
mouseDown = false;
mouseDetail = 0;


function doMouseMove(e) {
    mouseX = e.x - 10;
    mouseY = e.y - 25;
    mouseDetail = e.detail;
    if (mouseDown) {
        mapXOff = oldOffX - ((mouseDownX - mouseX));
        mapYOff = oldOffY - ((mouseDownY - mouseY));
        mapSteps = 3;
        mapInc = 2;
        mapCitiesSteps = 0;
        mapNodeSteps = 0;
        drawMap();
    }
}

function doClick(e) {
    mouseUnclaimed = true;
    for (let i = 0; i < cast.length; i++) {
        if (cast[i].contains(mouseX, mouseY) && mouseUnclaimed) {
            //console.log(`contains ${this}`);
            cast[i].clickHandler(e);
        }
    }
}

function doMouseDown(e) {
    mouseDown = true;
    //mapScale = 7;
    mouseDetail = e.detail;
    oldOffX = mapXOff;
    oldOffY = mapYOff;
    mouseDownX = mouseX;
    mouseDownY = mouseY;
    drawMap();
}

function doMouseUp(e) {
    mouseDown = false;
    mouseDetail = e.detail;
    //mapScale = 4
    mouseDownX = 0;
    mouseDownY = 0;
    drawMap();
}

function doKeyDown(e) {
    for (let i = 0; i < cast.length; i++) {
        console.log(`cast[${i}].acceptInput: ${cast[i].acceptInput}`)
        if (cast[i].acceptInput) {
            cast[i].keyHandler(e);
        }
    }
    if (e.key == " ") {

    }
}