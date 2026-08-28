let mouseLabel = "";

function draw() {
    // clear
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, c.width, c.height);

    drawMap();

    // Release player.cNotStoring if complete.
    // this is a terrible name to mean if the game is in 
    // the process of storing or unstoring the deck.
    if (!player.cNotStoring) {
        let done = true;
        // check if all cards have finished moving to their targetXY
        for (let win of cast) {
            if (win.type == "card") {
                if (!(win.x1 == win.targetX && win.y1 == win.targetY)) {
                    done = false;
                }
            }
        }
        if (done) {
            player.cNotStoring = true;
            player.cResettingStack = false;
        }
    }
    // if the card deck loaded and not stored, 
    // draw empty stack and Acehole indicators
    if (
        !player.cStored &&
        player.cardWindow.length > 1
    ) {
        ctx.lineWidth = 2;
        if (player.cStack < 1) {
            drawEmptyStackIndicator();
        }
        drawAceholes();

    }
    // draw windows based on priority, highest is top most window
    let s = cast.toSorted((a, b) => a.pri - b.pri);
    for (let i = 0; i < s.length; i++) {
       drawWin(s[i]);
    }

    /*if (player.cardWindow.length > 1) {
        cardDebug();
    }*/

    //drawIcon()
    drawCursor();
}

function cardDebug() {
    let s = "stack: ",
    d = "discard: ",
    a0 = "a0: ",
    a1 = "a1: ",
    a2 = "a2: ",
    a3 = "a3: ",
    c0 = "c0: ",
    c1 = "c1: ",
    c2 = "c2: ",
    c3 = "c3: ",
    c4 = "c4: ",
    c5 = "c5: ",
    c6 = "c6: ",
    strings = [s, d, a0, a1, a2, a3, c0, c1, c2, c3, c4, c5, c6];
    arrays = [
        player.cStack,
        player.cDiscard,
        player.cHoles[0],
        player.cHoles[1],
        player.cHoles[2],
        player.cHoles[3],
        player.cColumns[0],
        player.cColumns[1],
        player.cColumns[2],
        player.cColumns[3],
        player.cColumns[4],
        player.cColumns[5],
        player.cColumns[6]
    ]
    for (let i = 0; i < strings.length; i++) {
        buildDebug(strings[i], arrays[i], i)
    }
}

function buildDebug(str, array, i) {
    for (let a of array) {
        str += `${a.card} `
    }
    ctx.fillStyle = '#f4efef';
    ctx.font = "14px arial";
    ctx.fillText(str, 10, 30 + (30 * i));
}

function drawCoords(coords) {

    function drawLine(points) {
        if (points.length < 3) return;

        mapStepsMax = Math.max(mapStepsMax, points.length - 1);

        const max = Math.min(mapSteps, points.length - 1);

        for (let i = 0; i < max; i++) {
            if (mapSteps < 2) {
                // some countrys have a short first line, other are very long. 
                // Keep them all the same while moving the map
                ctxMap.lineWidth = 3;
                drawLineMap([
                    points[i][0] * mapScale + mapXOff,
                    -points[i][1] * mapScale + mapYOff,
                    points[i][0] * mapScale + mapXOff+1,
                    -points[i][1] * mapScale + mapYOff+1
                ]);
            } else {
                drawLineMap([
                    points[i][0] * mapScale + mapXOff,
                    -points[i][1] * mapScale + mapYOff,
                    points[i + 1][0] * mapScale + mapXOff,
                    -points[i + 1][1] * mapScale + mapYOff
                ]);
            }
        }
    }

    function walk(node) {

        if (!Array.isArray(node) || node.length === 0)
            return;

        // Are we looking at an array of [lon, lat] pairs?
        if (
            Array.isArray(node[0]) &&
            node[0].length >= 2 &&
            typeof node[0][0] === "number"
        ) {
            drawLine(node);
            return;
        }

        // Otherwise recurse into the next level.
        for (const child of node) {
            walk(child);
        }
    }

    walk(coords);
}

function drawMap() {
    let win = cast[0];

    // only update the map context if 
    // needed because it's expensive
    if (updateMap || mapSteps < mapStepsMax) {
        updateMap = false;

        // draw map a bit at a time, 
        // but increasingly faster
        mapSteps += mapInc;
        mapInc ++;

        // clear map context
        ctxMap.globalAlpha = 1;
        ctxMap.fillStyle = '#000000';
        ctxMap.fillRect(0, 0, c.width, c.height);
        ctxMap.lineWidth = 1;
        ctxMap.strokeStyle = mapColor;

        // do each country's line data
        for (let i = 0; i < map.length; i++) {
            const f = map[i];
            if (true) {
                const cords = f.geometry.coordinates;
                // the player's selected contry needed to be drawn on top to 
                // avoid overlaps with neighbors
                if (f.properties.name == player.selCountry) {
                    mapSel = cords;
                }
                drawCoords(cords);
            }
        }

        // Draw the player selected country
        ctxMap.strokeStyle = win.mapSelCountryColor;
        ctxMap.lineWidth = 2;
        drawCoords(mapSel);

        // Draw the map's boarder
        ctxMap.strokeStyle = win.mapBoarderColor;
        ctxMap.lineWidth = win.mapBoarderLineWidth;
        ctxMap.strokeRect(-180 * mapScale + mapXOff,
                        (-90 * mapScale) + mapYOff,
                        360 * mapScale,
                        (180 * mapScale));
    }

    // copy map to main ctx
    ctx.drawImage(cMap, 0, 0);

    // clear mapMarkers ctx if map reset
    if (mapSteps <= 1) {
        ctxMarkers.fillStyle = '#000000';
        ctxMarkers.fillRect(0, 0, c.width, c.height);
    }

    // size of node/city sqaures
    let bSize = 0.5;

    drawCities(bSize);
    drawNodes(bSize);
    drawProxyConnections();
    drawBruteConnections();

    // draw the mouse hover label
    player.windowHover = true;
    // but not if mousing over a window
    for (let w = 0; w < cast.length; w ++) {
        let c = cast[w];
        if (mouseX > c.x1 &&
            mouseX < c.x1 + c.xW &&
            mouseY > c.y1 &&
            mouseY < c.y1 + c.yH
        ) {
            player.windowHover = false;
        }
    }
    if (player.windowHover) {
        ctx.save();
        ctx.beginPath;
        ctx.rect(
            -180 * mapScale + mapXOff,
            (-90 * mapScale) + mapYOff,
            360 * mapScale,
            (180 * mapScale)
        );
        ctx.clip();
        ctx.fillStyle = '#ff3838';
        ctx.font = Math.max(6, Math.min(20, 12 * mapScale)) + "px courier";
        ctx.fillText(mouseLabel, mouseX, mouseY);
        ctx.restore();
    }

    if (player.selectedCity && mapCitiesSteps > 1) {
        let city = player.selectedCity;

        // loc marker
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = 4;
        ctx.strokeRect(
            (city.lon * mapScale) + mapXOff - (bSize * mapScale/2),
            (-(city.lat) * mapScale) + mapYOff - (bSize * mapScale/2),
            bSize * mapScale,
            bSize * mapScale
        );

        // loc label
        ctx.fillStyle = '#20974c';
        ctx.font = scaleFont(0.018, "arial");
        let str = city.name + ", " + city.country + ", population: " + (city.population);
        ctx.fillText(str,
                    (city.lon * mapScale) + mapXOff,
                    (-city.lat * mapScale) + mapYOff);
    }

    // selected node marker
    if (player.selectedNode && mapNodeSteps > 1) {
        let node = nodes[player.selNodeNum];

        // loc marker
        ctx.strokeStyle = '#f1700d';
        ctx.lineWidth = 3;
        ctx.strokeRect(
            (node.longitude * mapScale) + mapXOff - (bSize * mapScale/2),
            (-node.latitude * mapScale) + mapYOff - (bSize * mapScale/2),
            bSize * mapScale,
            bSize * mapScale);

        // loc label
        ctx.fillStyle = '#20974c';
        ctx.font = scaleFont(0.018, "arial");
        let lt = node.country + ", ip: " + node.ip_address;
        ctx.fillText(lt,
                    (node.longitude * mapScale) + mapXOff,
                    (-node.latitude * mapScale) + mapYOff);
    }
}

function drawCities(bSize) {
    if (mapSteps >= mapStepsMax && player.drawCities) {
        mapCitiesSteps += 1 + mapCitiesSteps / 4;
        mouseLabel = "";
        for (let i = 0; i < cities.length; i++) {
            if (i < mapCitiesSteps) {
                let city = cities[i];

                if (city.population > player.cityPopulationThreshold) {
                    // gradient effect
                    ctxMarkers.globalAlpha = 1;
                    ctxMarkers.strokeStyle = brighten('#0048ff', city.lat * 0.4 - 20);
                    ctxMarkers.lineWidth = 1;
                    ctxMarkers.strokeRect(
                        (city.lon * mapScale) + mapXOff - (bSize * mapScale/2),
                        (-city.lat * mapScale) + mapYOff  - (bSize * mapScale/2),
                        bSize * mapScale,
                        bSize * mapScale
                    );

                    if (mouseX > (city.lon * mapScale) + mapXOff - (bSize * mapScale/2) &&
                        mouseX < (city.lon * mapScale) + mapXOff + (bSize * mapScale) &&
                        mouseY > (-city.lat * mapScale) + mapYOff - (bSize * mapScale/2) &&
                        mouseY < (-city.lat * mapScale) + mapYOff + (bSize * mapScale)) {
                        // mouseDeatil is number of clicks, move 
                        // map to named location on doubleclick
                        if (mouseDetail == 2 && mouseUnclaimed) {
                            mapScale = 30;
                            mapXOff = (getWidth()/3*2) - (city.lon * mapScale);
                            mapYOff = (getHeight()/2) - (-city.lat * mapScale);
                            mapSteps = 0;
                            mapNodeSteps = 0;
                            mapInc = 2;
                            player.selCountry = city.country;
                            //console.log(player.selCountry);
                            cast[0].text = `Selected ${city.name}, ${city.country}`;
                            cast[0].setText(cast[0].text);
                            player.selectedCity = city;
                            updateMap = true;
                        }
                        mouseLabel = city.name + ", " + city.country +
                                    ", population: " + (city.population);
                    }
                }
            }           
        }
    }
}

function drawNodes(bSize) {
    if (mapSteps >= mapStepsMax && player.drawNodes) {
        mapNodeSteps += 1 + mapNodeSteps/4;
        for (let i = 0; i < nodes.length; i++) {
            let node = nodes[i];
            if (i < mapNodeSteps && node.discovered) {
                if (mouseX > (node.longitude * mapScale) + mapXOff - (bSize * mapScale/2) &&
                    mouseX < (node.longitude * mapScale) + mapXOff + (bSize * mapScale) &&
                    mouseY > (-node.latitude * mapScale) + mapYOff  - (bSize * mapScale/2) &&
                    mouseY < (-node.latitude * mapScale) + mapYOff + (bSize * mapScale)) {
                    // draw highlighted node marker
                    ctxMarkers.globalAlpha = 1;
                    ctxMarkers.strokeStyle = '#e60ed4';
                    ctxMarkers.lineWidth = 3;
                    ctxMarkers.strokeRect(
                        (node.longitude * mapScale) + mapXOff - (bSize * mapScale/2),
                        (-node.latitude * mapScale) + mapYOff - (bSize * mapScale/2),
                        bSize * mapScale,
                        bSize * mapScale
                    ); 

                    let label = node.ip_address + ", " + node.city;
                    ctx.fillStyle = '#f4eded';
                    ctx.font = scaleFont(0.010, "arial");
                    ctx.fillText(label, (node.longitude * mapScale) + mapXOff,
                                        -(node.latitude * mapScale) + mapYOff + bSize);

                    // mouseDeatil is number of clicks, move 
                    // map to named node on doubleclick
                    if (mouseDetail == 2 && mouseUnclaimed) {
                        mapScale = 50;
                        mapXOff = (getWidth()/3*2) - (node.longitude * mapScale);
                        mapYOff = (getHeight()/2) - (-node.latitude * mapScale);
                        mapSteps = 0;
                        mapNodeSteps = 0;
                        mapInc = 2;
                        player.selCountry = node.country;
                        //console.log(player.selcountry)
                        cast[0].text = `Selected node: ${node.city}, ${node.country} \n
                                        ${node.router.manufacturer} ${node.router.model} 
                                        IP: ${node.ip_address}`;
                        cast[0].setText(cast[0].text);
                        cast[0].textDisplayChar = 0;
                        player.selectedNode = nodes[i];
                        updateMap = true;
                    }

                    // text label, not sure this works. 
                    // it's reusing mouseLabel, which seems wrong. 
                    // ckeck it later
                    
                    //ctxMarkers.fillStyle = '#c37105d8';
                    //ctxMarkers.font = scaleFont(0.018, "arial");
                    //mouseLabel = node.city + ", " + node.country +
                    //            ", " + (node.router.manufacturer) +
                    //            " " + (node.router.model)
                } else {
                    // standard node marker color with gradient
                    //ctxMarkers.strokeStyle = brighten('#7dad06', node.lat * 0.4 - 20);
                    ctxMarkers.strokeStyle = '#a40396';
                    ctxMarkers.lineWidth = 4;
                    ctxMarkers.strokeRect(
                        (node.longitude * mapScale) + mapXOff - (bSize * mapScale/2),
                        (-node.latitude * mapScale) + mapYOff - (bSize * mapScale/2),
                        bSize * mapScale,
                        bSize * mapScale
                    );
                } 
            }          
        }
    }

    // copy the markers to the main ctx
    ctx.drawImage(cMarkers, 0, 0);
}

function drawProxyConnections() {
    // draw lines between network proxy connections on map
    if (mapSteps >= mapStepsMax && player.drawNodes) {
        let g = 155;
        if (player.nodeStack.length > 1) {
            for (let i = 0; i < player.nodeStack.length - 1; i++) {
                //console.log(g/(player.nodeStack.length-i))
                ctx.strokeStyle = `rgb(${(g/player.nodeStack.length)*(i+1)+100}, 20, 20)`;
                let l1 = nodes[player.nodeStack[i]];
                let l2 = nodes[player.nodeStack[i+1]];
                mapNodeStackSteps += 0.02;
                if (i < mapNodeStackSteps) {
                    ctx.lineWidth = 1 * mapScale;
                    drawLine([(l1.longitude * mapScale) + mapXOff, -(l1.latitude * mapScale) + mapYOff, 
                              (l2.longitude * mapScale) + mapXOff, -(l2.latitude * mapScale) + mapYOff]);
                }
            }
        }
    }

    //label network proxy connection cities
    if (mapSteps >= mapStepsMax && player.drawNodes) {
        let g = 155;
        ctx.lineWidth = mapScale * 0.5;
        if (player.nodeStack.length > 1) {
            for (let i = 0; i < player.nodeStack.length - 1; i++) {
                if (i < mapNodeStackSteps) {
                    let node = nodes[player.nodeStack[i+1]];
                    if (node.compromisedAccounts.length > 0) {
                        // node aquired
                        ctx.strokeStyle = `rgb(19, 195, 39)`;
                    } else {
                        // un hacked
                        ctx.strokeStyle = `rgb(138, 6, 6)`;
                    }
                    // ring
                    ctx.beginPath();
                    ctx.arc((node.longitude * mapScale) + mapXOff,
                            -(node.latitude * mapScale) + mapYOff,
                            1 * mapScale,
                            0,
                            2 * Math.PI); // x, y, radius, startAngle, endAngle
                    ctx.stroke();

                    // country, city label
                    let label = node.country + ", " + node.city;
                    ctx.fillStyle = '#f4eded';
                    ctx.font = scaleFont(0.010, "arial");
                    ctx.fillText(label, (node.longitude * mapScale) + mapXOff,
                                        -(node.latitude * mapScale) + mapYOff);
                }
            }
        }
    }
}

function drawBruteConnections() {
    // draw lines between brute force and homme
    if (mapSteps >= mapStepsMax) {
        if (player.bruteWindow.length > 0) {
            for (let i = 0; i < player.bruteWindow.length; i++) {
                ctx.strokeStyle = `rgb(200, 200, 200)`;
                let l1 = nodes[player.nodeStack[0]];
                let l2 = nodes[player.bruteWindow[i].bNode];
                ctx.lineWidth = 1 //Math.min(mapScale * 1, 4)
                drawLine([(l1.longitude * mapScale) + mapXOff, -(l1.latitude * mapScale) + mapYOff, 
                            (l2.longitude * mapScale) + mapXOff, -(l2.latitude * mapScale) + mapYOff]);
            }
        }
    }

    //label
    if (mapSteps >= mapStepsMax) {
        ctx.lineWidth = Math.min(mapScale * 1, 4);
        for (let i = 0; i < player.bruteWindow.length; i++) {
            let w = player.bruteWindow[i];
            let node = nodes[w.bNode];
            ctx.strokeStyle = w.backgroundColor;
            
            // ring
            ctx.beginPath();
            ctx.arc((node.longitude * mapScale) + mapXOff,
                    -(node.latitude * mapScale) + mapYOff,
                    1 * mapScale,
                    0,
                    2 * Math.PI); // x, y, radius, startAngle, endAngle
            ctx.stroke();

            /*console.log(
                i,
                "window:",
                player.bruteWindow[i],
                "bNode:",
                player.bruteWindow[i].bNode,
                "color:",
                player.bruteWindow[i].backgroundColor
            );*/

            // cit, country label
            let label = `${node.city}, ${node.country}`;
            ctx.fillStyle = '#f4eded';
            ctx.font = scaleFont(0.010, "arial");
            ctx.fillText(label, (node.longitude * mapScale) + mapXOff,
                                -(node.latitude * mapScale) + mapYOff);
        }
    }
}

function drawCursor() {
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    let x = mouseX,
    y = mouseY;
    const line = [x,y,x,y+10,x+5,y+10,x+8,y+15,x+5,y+10,x+10,y+10,x,y];
    drawLine(line);

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
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

function drawIcon() {
    ctxMap.strokeStyle = '#ff1f02';
    ctxMap.lineWidth = 3;
    let icon = [[149, 9, 175, 10, 251, 43, 297, 101, 307, 125, 279, 72, 162, 34, 141, 38], [184, 16, 189, 19, 187, 25, 184, 30, 184, 35, 183, 29, 186, 25, 188, 22], [133, 19, 133, 23, 133, 27, 132, 27, 134, 26, 134, 24, 134, 22, 132, 21], [123, 21, 123, 25, 123, 29, 124, 31, 121, 30, 122, 27, 124, 24, 121, 22], [127, 23, 127, 25, 128, 26, 128, 28, 127, 29, 126, 30, 129, 26, 129, 24], [177, 23, 179, 25, 179, 29, 178, 32, 176, 34, 178, 29, 181, 27, 180, 24], [173, 24, 172, 27, 171, 30, 170, 33, 172, 34, 168, 31, 169, 28, 170, 30], [91, 26, 88, 29, 84, 31, 80, 33, 76, 35, 73, 37, 70, 38, 74, 38], [112, 26, 113, 30, 114, 34, 117, 33, 120, 31, 118, 36, 115, 32, 114, 29], [108, 28, 109, 32, 109, 37, 108, 41, 108, 46, 108, 51, 107, 47, 107, 43], [189, 28, 189, 31, 189, 34, 187, 35, 190, 32, 191, 30, 187, 31, 190, 30], [195, 30, 195, 33, 194, 35, 195, 37, 196, 36, 192, 34, 193, 34, 194, 32], [205, 30, 205, 33, 203, 34, 202, 36, 201, 37, 200, 35, 201, 35, 203, 33], [211, 31, 211, 34, 209, 35, 209, 38, 210, 39, 207, 37, 205, 37, 208, 35], [101, 32, 100, 39, 96, 43, 95, 36, 94, 40, 101, 40, 99, 37, 104, 33], [129, 32, 129, 42, 125, 44, 124, 38, 121, 42, 119, 42, 131, 41, 130, 39], [216, 34, 216, 38, 213, 40, 216, 37, 220, 34, 223, 35, 225, 38, 225, 35], [90, 38, 90, 40, 90, 42, 90, 44, 90, 46, 89, 47, 89, 45, 89, 43], [227, 39, 225, 41, 225, 45, 224, 45, 223, 42, 225, 40, 230, 39, 231, 42], [67, 40, 66, 43, 64, 43, 62, 46, 60, 46, 58, 49, 56, 50, 65, 43], [76, 40, 77, 45, 78, 50, 80, 54, 82, 50, 80, 46, 82, 53, 80, 50], [115, 41, 114, 44, 115, 47, 117, 45, 113, 46, 111, 44, 112, 47, 111, 47], [236, 43, 235, 44, 235, 46, 234, 47, 232, 47, 231, 47, 230, 48, 230, 47], [158, 44, 110, 73, 112, 56, 103, 58, 147, 70, 143, 73, 188, 87, 204, 108], [239, 45, 240, 47, 239, 49, 238, 50, 236, 49, 235, 52, 234, 52, 234, 50], [173, 46, 175, 46, 177, 46, 178, 47, 180, 47, 182, 47, 183, 48, 185, 48], [103, 47, 102, 49, 102, 52, 103, 54, 104, 53, 106, 52, 101, 51, 103, 50], [193, 48, 204, 62, 214, 77, 224, 92, 234, 107, 240, 113, 223, 89, 208, 67], [251, 48, 249, 49, 244, 51, 239, 54, 241, 53, 249, 57, 244, 59, 250, 55], [94, 49, 94, 54, 94, 59, 96, 58, 93, 55, 96, 51, 97, 53, 98, 54], [73, 50, 72, 53, 72, 57, 74, 59, 74, 58, 73, 56, 71, 53, 75, 50], [136, 51, 134, 53, 138, 51, 140, 53, 142, 53, 144, 54, 143, 58, 143, 54], [207, 52, 213, 60, 218, 68, 224, 76, 229, 85, 235, 93, 241, 100, 226, 78], [61, 53, 61, 60, 64, 64, 66, 68, 66, 63, 65, 57, 64, 59, 64, 62], [187, 56, 188, 58, 187, 60, 185, 59, 183, 60, 181, 60, 179, 61, 179, 60], [160, 58, 163, 63, 168, 80, 161, 96, 151, 86, 161, 85, 160, 86, 183, 94], [46, 59, 46, 60, 46, 61, 46, 62, 45, 62, 45, 63, 44, 63, 43, 63], [142, 59, 142, 64, 140, 63, 138, 64, 137, 68, 140, 68, 139, 68, 141, 63], [216, 60, 217, 60, 218, 60, 218, 61, 219, 61, 220, 61, 220, 62, 221, 62], [251, 60, 250, 62, 249, 64, 249, 62, 247, 61, 252, 62, 253, 60, 256, 61], [42, 64, 34, 77, 26, 90, 29, 103, 31, 103, 20, 91, 18, 103, 23, 92], [57, 64, 58, 65, 59, 66, 59, 68, 60, 69, 60, 71, 61, 72, 62, 71], [190, 64, 189, 65, 188, 66, 187, 65, 186, 66, 185, 67, 184, 66, 191, 65], [196, 65, 196, 66, 196, 67, 197, 67, 197, 68, 197, 66, 197, 65, 198, 65], [250, 65, 256, 65, 260, 68, 256, 68, 254, 70, 262, 69, 266, 72, 267, 71], [56, 67, 56, 69, 56, 71, 56, 73, 56, 75, 56, 77, 55, 72, 55, 70], [126, 67, 123, 71, 128, 68, 132, 74, 134, 78, 133, 83, 129, 83, 131, 85], [102, 70, 101, 73, 100, 76, 98, 78, 97, 81, 95, 82, 97, 79, 99, 75], [153, 70, 150, 77, 146, 83, 143, 90, 139, 96, 142, 88, 147, 81, 150, 75], [198, 70, 197, 72, 195, 71, 193, 72, 191, 73, 189, 74, 188, 73, 199, 72]];
    for (let i = 0; i < icon.length; i++) {
        drawLineMap(icon[i]);
    }
    ctxMap.strokeStyle = '#c91b04';
    ctxMap.lineWidth = 2;
    for (let i = 0; i < icon.length; i++) {
        drawLineMap(icon[i]);
    }
    ctxMap.strokeStyle = '#8b1404';
    ctxMap.lineWidth = 1;
    for (let i = 0; i < icon.length; i++) {
        drawLineMap(icon[i]);
    }
}

function drawWin(win) { // draw a window
        if (win.type == "card") {
            // if over an empty acehole, draw indicator
            if (win.mouseDrag) {
                drawAceholes(win);
            }

            blitWinRect(win);
            win.xP = win.xW;
            win.xP = win.yH;
            return;
        }
        // update the animation, blit the rect and boarders if fully open draw text.
        if (win.toOpen) {
            // is opening
            if (win.xP < win.xW) {
                win.xP += win.aniSpeed;
                if (win.xP > win.xW) {
                    win.xP = win.xW;
                }
            }
            if (win.yP < win.yH) {
                win.yP += win.aniSpeed;
                if (win.yP > win.yH) {
                    win.yP = win.yH;
                }
            }

            blitWinRect(win);

            if (win.xP == win.xW && win.yP == win.yH) {
                win.openedState();
            } else {
                win.aniSpeed += win.ease;
            }

        } else {
            // is closing
            if (win.xP > 0) {
                win.xP -= win.aniSpeed;
                if (win.xP < 0) {
                    win.xP = 0;
                }
            }
            if (win.yP > 0) {
                win.yP -= win.aniSpeed;
                if (win.yP < 0) {
                    win.yP = 0;
                }
            }
            
            blitWinRect(win);

            if (win.xP == 0 && win.yP == 0) {
                win.closedState();
            } else {
                win.aniSpeed -= win.ease;
            }
        }
    }

    function blitWinRect(win) {
        ctx.strokeStyle = win.rectColor;
        //ctx.rectLineWidth = win.rectLineWidth;
        ctx.lineWidth = win.rectLineWidth;

        if (win.xP > 0 || win.yP > 0) {
            // background
            if (win.opaqueBackground && win.type != "card") {
                if (win.type != "reader") {
                    ctx.globalAlpha = win.alpha;
                }
                ctx.fillStyle = win.backgroundColor;
                if (win.isRounded) {
                    ctx.beginPath();
                    ctx.roundRect(win.x1, win.y1, win.xP, win.yP, win.cornerRad);
                    ctx.fill();
                } else {
                    ctx.fillRect(win.x1, win.y1, win.xP, win.yP);
                }
                ctx.globalAlpha = 1;
            }

            if (win.type == "browser") {

                drawBrowserWindow(win);

                return;

            }


            // main rect
            if (win.type != "audio" && win.type != "card" ) {
                if (win.isRounded) {
                    ctx.beginPath();
                    ctx.roundRect(win.x1, win.y1, win.xP, win.yP, win.cornerRad);
                    ctx.stroke();
                } else {
                    ctx.strokeRect(win.x1, win.y1, win.xP, win.yP);
                }
            }

            // boarder
            if (win.hasBoarder) {
                ctx.lineWidth = win.boarderLineWidth;
                if (win.isRounded) {
                    ctx.beginPath();
                    ctx.roundRect(
                        win.x1 - (win.boarderWidth * (win.xP/win.xW)),
                        win.y1 - (win.boarderHeight * (win.yP / win.yH)),
                        win.xP + ((win.boarderWidth * (win.xP/win.xW)) * 2),
                        win.yP + ((win.boarderHeight * (win.yP / win.yH)) * 2),
                        win.cornerRad
                    );
                    ctx.stroke();
                } else {
                    ctx.strokeRect(
                        win.x1 - (win.boarderWidth * (win.xP/win.xW)),
                        win.y1 - (win.boarderHeight * (win.yP / win.yH)),
                        win.xP + ((win.boarderWidth * (win.xP/win.xW)) * 2),
                        win.yP + ((win.boarderHeight * (win.yP / win.yH)) * 2)
                    );
                }
            }

            // box to resize window
            if (
                mouseX > win.x1 + win.xW - 20 &&
                mouseX < win.x1 + win.xW &&
                mouseY > win.y1 + win.yH - 20 &&
                mouseY < win.y1 + win.yH
            ) {
                ctx.strokeRect(
                    win.x1 + win.xW - 20,
                    win.y1 + win.yH - 20,
                    20,
                    20
                );
            }

            // card
            if (win.type == "card") {
                // move card twords dest
                const speed = 40;

                const dx = win.targetX - win.x1;
                const dy = win.targetY - win.y1;
                const dist = Math.hypot(dx, dy);

                if (dist <= speed) {
                    win.x1 = win.targetX;
                    win.y1 = win.targetY;
                } else {
                    win.x1 += (dx / dist) * speed;
                    win.y1 += (dy / dist) * speed;
                }

                if (c.scale != c.targetScale) {
                    win.cardLines = cardVector(win.card, 0, 0, win.scale);
                }
                
                const lines = win.cardLines;
                // Fill card
                const cardPath = new Path2D();
                
                cardPath.moveTo(lines[0][0]+win.x1, lines[0][1]+win.y1);

                for (let i = 0; i < 8; i++) {
                    cardPath.lineTo(lines[i][2]+win.x1, lines[i][3]+win.y1);
                }

                cardPath.closePath();
                
                if (win.shown) {
                    ctx.globalAlpha = 1;
                    ctx.fillStyle = win.backgroundColor;
                } else {
                    // back if card
                    ctx.globalAlpha = win.alpha;
                    ctx.fillStyle = '#0000FF'
                }
                ctx.fill(cardPath);
                ctx.lineWidth = 2;
                if (win.shown) {
                    // Red / black
                    const suit = win.card.slice(-1).toUpperCase();

                    ctx.strokeStyle =
                        (suit === "H" || suit === "D")
                            ? "#fe0303"
                            : "#0b0b0b";

                    // Entire card in ONE canvas path
                    drawCardLines(win, lines);
                } else {
                    // back of card
                    ctx.strokeStyle = "#f5f3f3"
                    drawCardLines(win, lines.slice(0, 8));
                    ctx.strokeStyle = "#080808"
                    drawCardLines(win, lines.slice(8, 16));
                }
                
            }
            if (win.type == "audio") {
                ctx.save();

                const px = win.x1;
                const py = win.y1;
                const pw = win.xP;
                const ph = win.yP;

                const accent = brighten(win.backgroundColor, 20);

                // ----------------------
                // Player background
                // ----------------------
                const radius = Math.min(pw, ph) * 0.06;

                ctx.globalAlpha = 0.25;
                ctx.fillStyle = "#111";
                if (win.isRounded) {
                    ctx.beginPath();
                    ctx.roundRect(px, py, pw, ph, radius);
                    ctx.stroke();
                } else {
                    ctx.strokeRect(px, py, pw, ph);
                }
                ctx.globalAlpha = 1;

                ctx.strokeStyle = accent;
                ctx.lineWidth = Math.max(1, pw * 0.01);
                ctx.stroke();


                // ----------------------
                // Song title display
                // ----------------------
                const marginX = pw * 0.05;
                const titleX = px + marginX;
                const titleY = py + ph * 0.12;
                const titleW = pw - marginX * 2;
                const titleH = ph * 0.25;

                const gradient = ctx.createLinearGradient(
                    titleX,
                    titleY,
                    titleX,
                    titleY + titleH
                );

                gradient.addColorStop(0, "#292929");
                gradient.addColorStop(1, "#151515");

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.roundRect(
                    titleX,
                    titleY,
                    titleW,
                    titleH,
                    radius * 0.6
                );
                ctx.fill();

                ctx.strokeStyle = brighten(win.backgroundColor, 30);
                ctx.lineWidth = 1;
                ctx.stroke();


                // ----------------------
                // Song title text
                // ----------------------
                ctx.save();

                ctx.beginPath();
                ctx.rect(titleX, titleY, titleW, titleH);
                ctx.clip();

                ctx.fillStyle = "#fff";
                ctx.font = `${titleH * 0.45}px sans-serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                drawSongTitle(
                    titleX,
                    titleY,
                    titleW,
                    titleH,
                    decodeURIComponent(backgroundMusic[0].audio.src),
                    win
                );

                ctx.restore();


                // ----------------------
                // Buttons
                // ----------------------
                const buttons = [
                    "<<",
                    "▶",
                    "⏹",
                    ">>"
                ];

                const buttonAreaY = titleY + titleH + ph * 0.12;
                const buttonAreaH = ph * 0.28;

                const gap = pw * 0.025;
                const buttonSize = Math.min(
                    buttonAreaH,
                    (pw * 0.85 - gap * 3) / 4
                );

                const totalButtonsW =
                    buttonSize * buttons.length +
                    gap * (buttons.length - 1);

                const startX =
                    px + (pw - totalButtonsW) / 2;

                const audio = backgroundMusic[0]?.audio;

                buttons.forEach((text, i) => {

                    const bx = startX + i * (buttonSize + gap);
                    const by = buttonAreaY;

                    if (!win.audioButtons) {
                        win.audioButtons = [];
                    }

                    win.audioButtons[i] = {
                        x: bx,
                        y: by,
                        w: buttonSize,
                        h: buttonSize,
                        action: i
                    };

                    ctx.save();

                    ctx.shadowColor = "black";
                    ctx.shadowBlur = buttonSize * 0.15;
                    ctx.shadowOffsetY = buttonSize * 0.08;

                    if (mouseDown &&
                        mouseX >= bx &&
                        mouseX <= bx + buttonSize &&
                        mouseY >= by &&
                        mouseY <= by + buttonSize
                    ) {
                        ctx.fillStyle = brighten(win.backgroundColor, 25);
                    } else {
                        ctx.fillStyle = "#222";
                    }
                    ctx.beginPath();
                    ctx.roundRect(
                        bx,
                        by,
                        buttonSize,
                        buttonSize,
                        buttonSize * 0.2
                    );
                    ctx.fill();

                    ctx.restore();


                    ctx.strokeStyle = brighten(
                        win.backgroundColor,
                        25
                    );

                    ctx.lineWidth = Math.max(1, buttonSize * 0.04);

                    ctx.beginPath();
                    ctx.roundRect(
                        bx,
                        by,
                        buttonSize,
                        buttonSize,
                        buttonSize * 0.2
                    );
                    ctx.stroke();


                    ctx.fillStyle = "#eee";
                    ctx.font = `${buttonSize * 0.4}px sans-serif`;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";

                    // play/paused button icon
                    if (i == 1) {
                        if (audio && !audio.paused) {
                            text = "⏸";
                        }
                    }

                    ctx.fillText(
                        text,
                        bx + buttonSize / 2,
                        by + buttonSize / 2
                    );
                });


                // ----------------------
                // Progress bar
                // ----------------------

                let progress = 0;

                if (audio && audio.duration && !isNaN(audio.duration)) {
                    progress = audio.currentTime / audio.duration;
                }

                progress = Math.max(0, Math.min(1, progress));

                const barW = pw * 0.8;
                const barH = Math.max(4, ph * 0.015);

                const barX = px + (pw - barW) / 2;
                const barY = py + ph * 0.88;

                // save bar for clicking
                win.progressBar = {
                    x: barX,
                    y: barY,
                    w: barW,
                    h: barH
                };


                // background
                ctx.fillStyle = "#333";
                ctx.beginPath();
                ctx.roundRect(
                    barX,
                    barY,
                    barW,
                    barH,
                    barH / 2
                );
                ctx.fill();


                // progress
                ctx.fillStyle = accent;
                ctx.beginPath();
                ctx.roundRect(
                    barX,
                    barY,
                    barW * progress,
                    barH,
                    barH / 2
                );
                ctx.fill();

                // ----------------------
                // Time display
                // ----------------------

                function formatTime(seconds) {
                    if (!isFinite(seconds) || seconds < 0) {
                        return "0:00";
                    }

                    const mins = Math.floor(seconds / 60);
                    const secs = Math.floor(seconds % 60);

                    return `${mins}:${secs.toString().padStart(2, "0")}`;
                }

                const currentTime = audio ? audio.currentTime : 0;
                const duration =
                    audio && isFinite(audio.duration)
                        ? audio.duration
                        : 0;

                // Center vertically with the buttons
                const timeY = buttonAreaY + buttonSize / 2;

                // Place times just outside the first/last button
                const timeGap = pw * 0.025;

                ctx.fillStyle = "#ddd";
                ctx.font = `${Math.max(10, buttonSize * 0.22)}px sans-serif`;
                ctx.textBaseline = "middle";

                // Left timer
                ctx.textAlign = "right";
                ctx.fillText(
                    formatTime(currentTime),
                    startX - timeGap,
                    timeY
                );

                // Right timer
                ctx.textAlign = "left";
                ctx.fillText(
                    formatTime(duration),
                    startX + totalButtonsW + timeGap,
                    timeY
                );

                ctx.restore();
            }
        }
    }

    function drawSongTitle(titleX, titleY, titleW, titleH, title, win) {
        ctx.save();

        // Clip to title display area
        ctx.beginPath();
        ctx.rect(titleX, titleY, titleW, titleH);
        ctx.clip();

        ctx.fillStyle = "#fff";
        ctx.font = `${titleH * 0.45}px sans-serif`;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        const textWidth = ctx.measureText(title).width;

        const centerX = titleX + titleW / 2;
        const centerY = titleY + titleH / 2;

        if (textWidth > titleW - 20) {
            ctx.textAlign = "left";

            if (!backgroundMusic[0].audio.paused) {
                win.songScrollOffset -= win.songScrollSpeed;
            }

            if (win.songScrollOffset < -textWidth - 50) {
                win.songScrollOffset = titleW;
            }

            ctx.fillText(
                title,
                titleX + win.songScrollOffset,
                centerY
            );
        } else {
            ctx.textAlign = "center";

            ctx.fillText(
                title,
                centerX,
                centerY
            );
        }

        ctx.restore();
    }

    function brighten(hex, percent) {
        const num = parseInt(hex.slice(1), 16);
        const amt = Math.round(255 * (percent / 100));

        let r = Math.min(255, (num >> 16) + amt);
        let g = Math.min(255, ((num >> 8) & 0x00FF) + amt);
        let b = Math.min(255, (num & 0x0000FF) + amt);

        return `rgb(${r}, ${g}, ${b})`;
    }

    function drawBrowserWindow(win) {

    ctx.save();

    ctx.beginPath();

    ctx.rect(
        win.x1,
        win.y1,
        win.xW,
        win.yH
    );

    ctx.clip();


    ctx.drawImage(
        win.surface,
        win.x1,
        win.y1,
        win.xW,
        win.yH
    );


    ctx.restore();


    ctx.strokeStyle = win.rectColor;

    ctx.strokeRect(
        win.x1,
        win.y1,
        win.xW,
        win.yH
    );

}

function cardVector(card, offsetX = 0, offsetY = 0, scale = 1) {
    const rank = card.slice(0, -1).toUpperCase();
    const suit = card.slice(-1).toUpperCase();

    const lines = [];

    function line(x1, y1, x2, y2) {
        lines.push([
            offsetX + x1 * scale,
            offsetY + y1 * scale,
            offsetX + x2 * scale,
            offsetY + y2 * scale
        ]);
    }

    function path(points, closed = false) {
        for (let i = 0; i < points.length - 1; i++) {
            line(
                points[i][0], points[i][1],
                points[i + 1][0], points[i + 1][1]
            );
        }

        if (closed) {
            const a = points[points.length - 1];
            const b = points[0];
            line(a[0], a[1], b[0], b[1]);
        }
    }

    // ------------------------------------------------------------
    // CARD OUTLINE
    // ------------------------------------------------------------

    // Card is 100 x 140 vector units
    path([
        [8, 0],
        [92, 0],
        [100, 8],
        [100, 132],
        [92, 140],
        [8, 140],
        [0, 132],
        [0, 8]
    ], true);

    // Inner border
    path([
        [12, 5],
        [88, 5],
        [95, 12],
        [95, 128],
        [88, 135],
        [12, 135],
        [5, 128],
        [5, 12]
    ], true);

    // ------------------------------------------------------------
    // VECTOR GLYPHS
    // ------------------------------------------------------------

    const glyphs = {

    A: [
        [[0, 40], [20, 0], [40, 40]],
        [[8, 25], [32, 25]]
    ],

    K: [
        [[0, 0], [0, 40]],
        [[0, 20], [35, 0]],
        [[0, 20], [35, 40]]
    ],

    Q: [
        [[35, 8], [32, 4], [26, 1], [20, 0],
         [12, 2], [6, 7], [3, 14],
         [3, 26], [7, 34], [14, 39],
         [22, 40], [29, 37], [35, 31],
         [37, 24], [37, 16], [35, 8]],
        [[25, 28], [40, 43]]
    ],

    J: [
        [[0, 0], [35, 0]],
        [[28, 0], [28, 31],
         [26, 36], [22, 40],
         [13, 40], [7, 38],
         [3, 34], [1, 29]]
    ],

    T: [
        [[0, 0], [40, 0]],
        [[20, 0], [20, 40]]
    ],

    "2": [
        [
            [3, 8], [6, 3], [12, 0],
            [30, 0], [36, 3], [40, 9],
            [40, 14], [37, 19],
            [4, 36], [0, 40],
            [40, 40]
        ]
    ],

    "3": [
        [
            [2, 4], [8, 0], [31, 0],
            [37, 4], [40, 9],
            [40, 15], [36, 19],
            [29, 20],
            [36, 21], [40, 25],
            [40, 32], [36, 37],
            [30, 40], [7, 40],
            [2, 36]
        ]
    ],

    "4": [
        [
            [30, 40], [30, 0]
        ],
        [
            [30, 0], [0, 27], [0, 29], [40, 29]
        ]
    ],

    "5": [
        [
            [38, 0], [5, 0],
            [4, 18], [7, 18],
            [13, 16], [25, 16],
            [33, 19], [38, 24],
            [38, 32], [34, 37],
            [28, 40], [8, 40],
            [2, 36]
        ]
    ],

    "6": [
        [
            [35, 2], [28, 0],
            [18, 0], [10, 4],
            [4, 12], [1, 22],
            [2, 31], [7, 37],
            [14, 40], [25, 40],
            [33, 36], [38, 30],
            [38, 24], [34, 19],
            [27, 16], [18, 16],
            [10, 20], [5, 26]
        ]
    ],

    "7": [
        [
            [1, 0], [40, 0],
            [40, 4], [18, 40]
        ]
    ],

    "8": [
        // Outer 8
        [
            [10, 0],
            [30, 0],
            [37, 4],
            [40, 10],
            [40, 15],
            [37, 19],
            [31, 20],
            [37, 21],
            [40, 25],
            [40, 31],
            [37, 36],
            [30, 40],
            [10, 40],
            [3, 36],
            [0, 31],
            [0, 25],
            [3, 21],
            [9, 20],
            [3, 19],
            [0, 15],
            [0, 10],
            [3, 4],
            [10, 0]
        ],

        // Middle divider
        [
            [7, 20],
            [33, 20]
        ]
    ],

    "9": [
        [
            [15, 45], [25, 43],
            [30, 40], [36, 34],
            [39, 26], [40, 16],
            [38, 8], [33, 3],
            [26, 0], [15, 0],
            [7, 4], [2, 10],
            [1, 17], [4, 23],
            [10, 27], [18, 28],
            [26, 25], [32, 20],
            [37, 14]
        ],
        /*[
            [37, 14], [35, 23],
            [31, 32], [25, 38],
            [20, 40]
        ]*/
    ],

    "10": [
        [[4, 0], [4, 40]],
        [[0, 5], [4, 0]],
        [[14, 0], [14, 40]],
        [[14, 0], [34, 0]],
        [[34, 0], [34, 40]],
        [[14, 40], [34, 40]]
    ]
};

    const suitGlyphs = {

    // HEART
    H: [
        [
            [20, 40],
            [5, 25],
            [0, 16],
            [0, 9],
            [4, 3],
            [10, 1],
            [15, 3],
            [20, 10],
            [25, 3],
            [30, 1],
            [36, 3],
            [40, 9],
            [40, 16],
            [35, 25],
            [20, 40]
        ]
    ],

    // DIAMOND
    D: [
        [
            [20, 0],
            [40, 20],
            [20, 40],
            [0, 20],
            [20, 0]
        ]
    ],

    // SPADE
    S: [
        [
            [20, 0],
            [15, 7],
            [8, 14],
            [3, 21],
            [2, 27],
            [5, 32],
            [10, 34],
            [15, 32],
            [20, 27],

            [25, 32],
            [30, 34],
            [35, 32],
            [38, 27],
            [37, 21],
            [32, 14],
            [25, 7],
            [20, 0]
        ],

        // stem
        [
            [20, 27],
            [20, 40]
        ],

        // base
        [
            [13, 40],
            [27, 40]
        ]
    ],

    // CLUB
    C: [
    // Compact, upright club outline
    [
        // Top lobe
        [20, 4],
        [16, 5],
        [13, 8],
        [12, 12],
        [13, 16],
        [16, 19],
        [20, 22],

        // Left lobe
        [17, 21],
        [13, 20],
        [9, 21],
        [6, 24],
        [5, 28],
        [7, 31],
        [10, 33],
        [14, 33],
        [17, 31],
        [19, 28],
        [20, 25],

        // Right lobe
        [21, 28],
        [23, 31],
        [26, 33],
        [30, 33],
        [33, 31],
        [35, 28],
        [34, 24],
        [31, 21],
        [27, 20],
        [23, 21],
        [20, 22],

        // Back to top lobe
        [24, 19],
        [27, 16],
        [28, 12],
        [27, 8],
        [24, 5],
        [20, 4]
    ],

    // Stem
    [
        [20, 25],
        [20, 40]
    ],

    // Base
    [
        [14, 40],
        [26, 40]
    ]
],

};

    // ------------------------------------------------------------
    // TOP-LEFT VALUE
    // ------------------------------------------------------------

    const glyph = glyphs[rank];

    if (glyph) {
        for (const p of glyph) {
            const translated = p.map(([x, y]) => [
                11 + x * 0.55,
                9 + y * 0.55
            ]);

            path(translated);
        }
    }

    // Top-left suit
    const suitGlyph = suitGlyphs[suit];

    /*if (suitGlyph) {
        for (const p of suitGlyph) {
            const translated = p.map(([x, y]) => [
                8 + x * 0.65,
                36 + y * 0.65
            ]);

            path(translated);
        }
    }*/

    // ------------------------------------------------------------
    // LARGE CENTER SUIT
    // ------------------------------------------------------------

    if (suitGlyph) {
        for (const p of suitGlyph) {
            const translated = p.map(([x, y]) => [
                50 + (x - 20) * 1.2,
                70 + (y - 20) * 1.2
            ]);

            path(translated);
        }
    }

    // ------------------------------------------------------------
    // BOTTOM-RIGHT VALUE (ROTATED 180°)
    // ------------------------------------------------------------

    if (glyph) {
        for (const p of glyph) {
            const translated = p.map(([x, y]) => [
                89 - x * 0.55,
                131 - y * 0.55
            ]);

            path(translated);
        }
    }

    return lines;
}

function drawCardLines(win, lines) {
    ctx.beginPath();

    for (const l of lines) {
        ctx.moveTo(l[0]+win.x1, l[1]+win.y1);
        ctx.lineTo(l[2]+win.x1, l[3]+win.y1);
    }

    ctx.stroke();
}

function drawEmptyStackIndicator() {
    if (
        mouseX > player.cX &&
        mouseX < player.cX + (100*player.cScale) &&
        mouseY > player.cY &&
        mouseY < player.cY + (140*player.cScale)
    ) {
        ctx.strokeStyle = '#ff00ee';
        ctx.strokeRect(
            player.cX,
            player.cY,
            100*player.cScale,
            140*player.cScale
        );
    }
}

function drawAceholes() {
    const y = player.cY;
    const w = 100 * player.cScale;
    const h = 140 * player.cScale;
    // check the aceholes
    for (let i = 0; i < 4; i++) {
        const x = player.cX + (i + 3) * (120 * player.cScale);
        if (
            mouseX > x &&
            mouseX < x + w &&
            mouseY > y &&
            mouseY < y + h
        ) {
            // is the hole empty? draw a little indicator for player comprehension
            if (player.cHoles[i].length < 1) {
                ctx.strokeStyle = '#ffff00';
                ctx.strokeRect(x, y, w, h);
            }
        }
    }
}
