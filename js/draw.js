function draw() {
    // clear
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, c.width, c.height);
    
    /*/ circle
    ctx.strokeStyle = '#FF0000';
    ctx.beginPath();
    ctx.arc(250, 250, 50, 0, 360);
    ctx.stroke();*/

    drawMap();
    for (let i = 0; i < cast.length; i++) {
        cast[i].draw();
        //console.log(cast[i]);
    }

    drawCursor();
}

function drawCords(cords) {
    for (let j = 0; j < cords.length; j++) {
        //console.log("cords[j].length: " + cords[j].length)
        if (cords[j].length > 1) {
            // draw that map incremenetally
            if (mapStepsMax < cords[j].length-1) {
                mapStepsMax = cords[j].length-1;
            }
            for (let k = 0; k < cords[j].length-1; k++) {
                if (k < mapSteps) {
                    const myLine = [((cords[j][k][0] * mapScale) + mapXOff),
                                    ((-(cords[j][k][1]) * mapScale) + mapYOff),
                                    ((cords[j][k+1][0] * mapScale) + mapXOff),
                                    ((-(cords[j][k+1][1]) * mapScale) + mapYOff)];
                    drawLineMap(myLine);
                }
            }
        } else {
            if (mapStepsMax < cords[j][0].length-1) {
                mapStepsMax = cords[j][0].length-1;
            }
            for (let k = 0; k < cords[j][0].length-1; k++) {
                if (k < mapSteps) {
                    for (let t = 0; t < cords[j].length; t++) {
                        const myLine = [((cords[j][t][k][0] * mapScale) + mapXOff),
                                    ((-(cords[j][t][k][1]) * mapScale) + mapYOff),
                                    ((cords[j][t][k+1][0] * mapScale) + mapXOff),
                                    ((-(cords[j][t][k+1][1]) * mapScale) + mapYOff)];
                        drawLineMap(myLine);
                    }
                }
            }
        }
    }
}

function drawMap() {
    if (updateMap || mapSteps < mapStepsMax) {
        // draw map a bit at a time
        mapSteps += mapInc;
        mapInc = mapInc + (mapInc/8);
        if (mapSteps > mapStepsMax) {mapSteps = mapStepsMax}
        updateMap = false;

        ctxMap.fillStyle = '#000000';
        ctxMap.fillRect(0, 0, c.width, c.height);
        ctxMap.lineWidth = 1;
        ctxMap.strokeStyle = mapColor;
        for (let i = 0; i < map.length; i++) {
            const f = map[i];
            if (f.properties.name != "") {
                //console.log("Drawling country: " + f.properties.name);
                const cords = f.geometry.coordinates;
                //let cl = cords.length;
                if (f.properties.name == player.selCity) {
                    mapSel = cords;
                }
                drawCords(cords);
            }
        }
        // highlight the selected country
        ctxMap.strokeStyle = '#f35303';
        drawCords(mapSel);
        //console.log("mapSel (" + player.selCity + "):");
        //console.log(mapSel);
        //console.log("mapInc: " + mapInc + ", mapSteps: " + mapSteps + ", mapStepsMax: " + mapStepsMax);
    }

    ctx.drawImage(cMap, 0, 0);

    // Draw Cities
    if (mapSteps >= mapStepsMax && player.drawCities) {
        for (let i = 0; i < cities.length; i++) {
            // loc
            ctx.strokeStyle = '#0048ff';
            ctx.lineWidth = 5;
            ctx.strokeRect(((cities[i].lon) * mapScale) + mapXOff,
                            (-(cities[i].lat) * mapScale) + mapYOff,
                            5,5);
            //console.log(locations[player.uid].address.country);

            if (mouseX > (cities[i].lon * mapScale) + mapXOff &&
                mouseX < (cities[i].lon * mapScale) + mapXOff + 10 &&
                mouseY > (-(cities[i].lat) * mapScale) + mapYOff &&
                mouseY < (-(cities[i].lat) * mapScale) + mapYOff + 10) 
                {
                // move map to named loc
                if (mouseDetail > 1) {
                    mapScale = 7;
                    mapXOff = (getWidth()/3*2) - ((cities[i].lon) * mapScale);
                    mapYOff = (getHeight()/2) - (-(cities[i].lat) * mapScale);
                    mapSteps = 30;
                    mapNodeSteps = 0;
                    mapInc = 2;
                    player.selCity = cities[i].country;
                    cast[0].text = `Selected city ${cities[i].name}, ${cities[i].country}`;
                    cast[0].setText(cast[0].text);
                    cast[0].textDisplayChar = 0;
                    drawMap();
                }
                ctx.fillStyle = '#FF0000';
                ctx.font = scaleFont(0.020, "arial");
                ctx.fillText(cities[i].name + ", " + cities[i].country +
                            ",  x: " + (cities[i].lon) +
                            ",  y: " + (cities[i].lat) +
                            ", population: " + (cities[i].population),
                            ((cities[i].lon) * mapScale) + mapXOff,
                            (-(cities[i].lat) * mapScale) + mapYOff);
            }            
        }
    }

    // draw network nodes
    if (mapSteps >= mapStepsMax && player.drawNodes) {
        mapNodeSteps += 60;
        for (let i = 0; i < nodes.length; i++) {
            if (i < mapNodeSteps && nodes[i].discovered) {
                if (mouseX > (nodes[i].longitude * mapScale) + mapXOff &&
                    mouseX < (nodes[i].longitude * mapScale) + mapXOff + 10 &&
                    mouseY > (-(nodes[i].latitude) * mapScale) + mapYOff &&
                    mouseY < (-(nodes[i].latitude) * mapScale) + mapYOff + 10) 
                    {
                    // draw highlighted loc marker
                    ctx.strokeStyle = '#35e60e';
                    ctx.lineWidth = 3;
                    ctx.strokeRect(((nodes[i].longitude) * mapScale) + mapXOff,
                                    (-(nodes[i].latitude) * mapScale) + mapYOff,
                                    5,5); 
                    // move map to named loc
                    if (mouseDetail > 1) {
                        mapScale = 50;
                        mapXOff = (getWidth()/3*2) - ((nodes[i].longitude) * mapScale);
                        mapYOff = (getHeight()/2) - (-(nodes[i].latitude) * mapScale);
                        mapSteps = 30;
                        mapNodeSteps = 0;
                        mapInc = 2;
                        player.selCity = nodes[i].country;
                        cast[0].text = `Selected node: ${nodes[i].city}, ${nodes[i].country} \n
                                        ${nodes[i].router.manufacturer} ${nodes[i].router.model} 
                                        IP: ${nodes[i].ip_address} `;
                        cast[0].setText(cast[0].text);
                        cast[0].textDisplayChar = 0;
                        drawMap();
                    }

                    // text label
                    ctx.fillStyle = '#c37105d8';
                    ctx.font = scaleFont(0.020, "arial");
                    ctx.fillText(nodes[i].city + ", " + nodes[i].country +
                                ", " + (nodes[i].router.manufacturer) +
                                " " + (nodes[i].router.model),
                                ((nodes[i].longitude) * mapScale) + mapXOff,
                                (-(nodes[i].latitude) * mapScale) + mapYOff);
                } else {
                    // standard node marker color
                    ctx.strokeStyle = '#d4ff00';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(((nodes[i].longitude) * mapScale) + mapXOff,
                                    (-(nodes[i].latitude) * mapScale) + mapYOff,
                                    5,5);
                } 
            }          
        }
    }
}

function drawCursor() {
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    let x = mouseX,
    y = mouseY;
    const line = [x,y,x,y+10,x+5,y+10,x+8,y+15,x+5,y+10,x+10,y+10,x,y];
    drawLine(line);

    if (debug) {
        ctx.font = scaleFont(0.015, "arial"); //"30px Hyperspace";
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText("x:" + x + ", y:" + y, x + 10, y+20);
    }
}

function drawLine(l) {
    ctx.beginPath();
    ctx.moveTo(l[0], l[1]);
    for (let i = 2; i < l.length; i += 2) {
        ctx.lineTo(l[i], l[i+1]);
    }
    ctx.stroke();
}

function drawLineMap(l) {
    ctxMap.beginPath();
    ctxMap.moveTo(l[0], l[1]);
    for (let i = 2; i < l.length; i += 2) {
        ctxMap.lineTo(l[i], l[i+1]);
    }
    ctxMap.stroke();
}