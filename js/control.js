let mouseX = 0,
mouseY = 0,
mouseDownX = 0,
mouseDownY = 0,
mouseLastX = 0,
mouseLastY = 0,
oldOffX = 0,
oldOffY = 0,
mouseUnclaimed = false,
mouseDown = false,
mouseDetail = 0;


function doWheel(e) {
    let adjustedWindow = false;
    // scale the cast member if mouse hover
    // but if windows overlap at mouse X/Y, only do the top most (pri 0)
    let s = cast.toSorted((a, b) => b.pri - a.pri);
    for (let w = 0; w < s.length; w ++) {
        let c = s[w];
        
        let o = 0;
        // mail has a lowered scroll area
        if (c.type == "mail") {
            o = c.xW/10 * 2.6;
        }
        if (mouseX > c.x1 &&
            mouseX < c.x1 + c.xW &&
            mouseY > c.y1 + o &&
            mouseY < c.y1 + c.yH &&
            !adjustedWindow) {

            adjustedWindow = true;

            c.wheelOff += e.deltaY;

            // set max
            c.textMaxLines = Math.floor((c.yH - o) / (c.fontSize * 1.25));
    
            // clear
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, c.width, c.height);
            // clear
            ctxMap.fillStyle = '#000000';
            ctxMap.fillRect(0, 0, c.width, c.height);
            // clear
            ctxMarkers.fillStyle = '#000000';
            ctxMarkers.fillRect(0, 0, c.width, c.height);
        } else if (mouseX > c.x1 &&
            mouseX < c.x1 + c.xW &&
            mouseY > c.y1 &&
            mouseY < c.y1 + c.yH &&
            !adjustedWindow) {
                // do nothing when scrolling on mail above message area
                adjustedWindow = true;
        }
    }
    // otherwise scale the map
    if (!adjustedWindow) {
        // zoom map at mouse position
        const oldScale = mapScale;
        mapScale -= e.deltaY / 100;
        mapScale = Math.max(0.1, mapScale);
        const ratio = mapScale / oldScale;
        mapXOff = mouseX - (mouseX - mapXOff) * ratio;
        mapYOff = mouseY - (mouseY - mapYOff) * ratio;
        // limit map reduction
        if (mapScale < 1) {
            mapScale = 1;
        }

        mapSteps = 1;
        mapInc = 0;
        mapCitiesSteps = 0;
        mapNodeSteps = 0;
        mapNodeStackSteps = 0;
    }
}

function doMouseMove(e) {
    let adjustedWindow = false;
    mouseX = e.x;
    mouseY = e.y;
    mouseDetail = e.detail;
    const dix = mouseX - mouseLastX;
    const diy = mouseY - mouseLastY;

    mouseLastX = mouseX;
    mouseLastY = mouseY;


    if (player.ignoreMouseDrag) {
        // clicking on not shown cards needs to have no effect
        // without ingnoreMouseDrag we'd be moving the map
        adjustedWindow = true;
    }
    if (mouseDown) {
        if (!movingMap) {
            // drag windows
            for (let w = 0; w < cast.length; w ++) {
                let c = cast[w];
                if (c.mouseDrag) { // moving this window
                    adjustedWindow = true;
                    if (c.resizing) {
                        if (c.type == "card") {
                            const dx = mouseX - c.resizeStartX;
                            const dy = mouseY - c.resizeStartY;

                            // Use the larger resize movement
                            let scale;

                            if (Math.abs(dx) > Math.abs(dy)) {
                                scale = (c.resizeStartW + dx) / 100;
                            } else {
                                scale = (c.resizeStartH + dy) / 140;
                            }

                            // Prevent tiny/negative cards
                            scale = Math.max(0.2, scale);

                            c.xW = 100 * scale;
                            c.yH = 140 * scale;

                            c.xP = c.xW;
                            c.yP = c.yH;

                            c.cardLines = cardVector(
                                c.card,
                                0,
                                0,
                                scale
                            );
                        } else {
                            c.xW = c.resizeStartW + (mouseX - c.resizeStartX);
                            c.yH = c.resizeStartH + (mouseY - c.resizeStartY);
                            c.xP = c.xW;
                            c.yP = c.yH;

                            c.xW = Math.max(c.xW, 100);
                            c.yH = Math.max(c.yH, 100);

                            if (c.type == "proxy") {
                                cast[0].pXW = c.xW;
                                cast[0].pYH = c.yH;
                            }
                            if (c.type == "reader") {
                                cast[0].rXW = c.xW;
                                cast[0].rYH = c.yH;
                            }

                            //re wrap text
                            // Set font and text color
                            ctx.fillStyle = c.textColor;
                            ctx.font = c.fontSize + "px " + c.textFont;
                            c.text = c.displayLines.join("\n");
                            c.displayLines = [];
                            if (c.type == "reader") {
                                c.setText(c.originalText, false);
                            } else {
                                c.setText(c.text, false);
                            }
                        }
                    } else {
                        // dragging
                        if (c.type == "card") {
                            // picked up from columns? remove it
                            if (!c.hasStartedDragging) {
                                c.hasStartedDragging = true;

                                // NOW actually remove it from its column
                                popCardFromColumn(c);
                            }
                            if (e.metaKey && !player.cWon) {
                                //console.log(dix, diy)
                                for (let card of player.cardWindow) {
                                    card.x1 += dix;
                                    card.y1 += diy;
                                    card.targetX = card.x1;
                                    card.targetY = card.y1;
                                }
                                player.cX += dix;
                                player.cY += diy;
                            } else {
                                c.x1 = mouseX + oldOffX;
                                c.y1 = mouseY + oldOffY;
                                c.targetX = c.x1;
                                c.targetY = c.y1;
                                moveChildren(c);
                            }
                            
                        } else if (c.type == "brute") {
                            if (e.metaKey) {
                                // move them all
                                //console.log(dix, diy)
                                for (let card of player.bruteWindow) {
                                    card.x1 += dix;
                                    card.y1 += diy;
                                    card.targetX = card.x1;
                                    card.targetY = card.y1;
                                }
                                player.bX1 += dix;
                                player.bY1 += diy;
                            } else {
                                c.x1 = mouseX + oldOffX;
                                c.y1 = mouseY + oldOffY;
                            }
                        } else {
                            c.x1 = mouseX + oldOffX;
                            c.y1 = mouseY + oldOffY;
                        }
                        

                        // save the updated proxy and reader windows loc so
                        // they respawn where the user closed them
                        if (c.type == "proxy") {
                            cast[0].pX1 = c.x1;
                            cast[0].pY1 = c.y1;
                        }
                        if (c.type == "reader") {
                            cast[0].rX1 = c.x1;
                            cast[0].rY1 = c.y1;
                        }
                    }

                    // clear
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(0, 0, c.width, c.height);
                    // clear
                    ctxMap.fillStyle = '#000000';
                    ctxMap.fillRect(0, 0, c.width, c.height);
                    // clear
                    ctxMarkers.fillStyle = '#000000';
                    ctxMarkers.fillRect(0, 0, c.width, c.height);
                }
            }
        }

        // drag map
        if (!adjustedWindow) {
            mapXOff = oldOffX - ((mouseDownX - mouseX));
            mapYOff = oldOffY - ((mouseDownY - mouseY));
            mapSteps = 1;
            mapInc = 0;
            mapCitiesSteps = 0;
            mapNodeSteps = 0;
            mapNodeStackSteps = 0;
        }
    } else {
        mouseLabel = "";
        let bSize = 0.5;
        // city label
        if (
            mapSteps >= mapStepsMax && 
            player.drawCities &&
            mapCitiesSteps >= cities.length
        ) {
            for (let i = 0; i < cities.length; i++) {
                if (i < mapCitiesSteps) {
                    let city = cities[i];
                    if (city.population > player.cityPopulationThreshold) {
                        if (
                            mouseX > (city.lon * mapScale) + mapXOff - (bSize * mapScale/2) &&
                            mouseX < (city.lon * mapScale) + mapXOff + (bSize * mapScale) &&
                            mouseY > (-city.lat * mapScale) + mapYOff - (bSize * mapScale/2) &&
                            mouseY < (-city.lat * mapScale) + mapYOff + (bSize * mapScale)
                        ) {
                            // city label if hovering
                            mouseLabel = city.name + ", " + city.country +
                                        ", population: " + (city.population);
                        }
                    }
                }  else {
                    // save cycles when i >= mapCitiesSteps
                    break;
                }         
            }
        }


        // node label
        if (
            mapSteps >= mapStepsMax &&
            player.drawNodes &&
            mapNodeSteps >= nodes.length
        ) {
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
                        ctx.fillText(
                            label,
                            (node.longitude * mapScale) + mapXOff,
                            -(node.latitude * mapScale) + mapYOff + bSize
                        );
                    } 
                }          
            }
        }
    }
}

function doClick(e) {
    mouseUnclaimed = true;
    let s1 = cast.toSorted((a, b) => b.pri - a.pri);
    // cards always on top and get clicks first
    s = s1.toSorted((a, b) => (b.type === "card") - (a.type === "card"));
    for (let i = 0; i < s.length; i++) {
        if (s[i].contains(mouseX, mouseY) && mouseUnclaimed) {
            mouseUnclaimed = false;
            s[i].clickHandler(e);
        }
    }
}

function doMouseDown(e) {
    e.preventDefault();
    // update mouse first
    mouseX = e.x;
    mouseY = e.y;

    movingMap = false;
    mouseDown = true;
    mouseDetail = e.detail;
    let notFound = true;
    let touchedCard = false;
    
    let s1 = cast.toSorted((a, b) => b.pri - a.pri);
    // cards always on top and get clicks first
    s = s1.toSorted((a, b) => (b.type === "card") - (a.type === "card"));
    for (let w = 0; w < s.length; w++) {
        let c = s[w];
        if (mouseX > c.x1 &&
            mouseX < c.x1 + c.xW &&
            mouseY > c.y1 &&
            mouseY < c.y1 + c.yH) {

            notFound = false;
            // DRAGGING
            if (c.type == "card" && !c.shown) {
                // don't drag cards that aren't shown
                touchedCard = true;
                player.ignoreMouseDrag = true;
                //setWindowPri(c);
                oldOffX = c.x1 - mouseX;
                oldOffY = c.y1 - mouseY;
            } else {
                // all other windows
                oldOffX = c.x1 - mouseX;
                oldOffY = c.y1 - mouseY;

                // draw this window on top now
                setWindowPri(c);

                // more CARD stuff
                if (c.type == "card") {
                    touchedCard = true;
                    if (!player.cStored) {
                        c.mouseDrag = true;

                        // break the parent bond
                        if (c.parentCard) {
                            c.parentCard.childCard = 0;
                        }

                        // pop from stack, discard and Aceholes
                        popCard(c);

                        // ajust card order before dragging groups
                        let t = c;
                        while (t.childCard) {
                            t.childCard.pri = t.pri + 1;
                            t = t.childCard;
                        }
                    }
                } else {
                    c.mouseDrag = true;
                }

                // Generic check if resizing instead of dragging
                if (
                    mouseX > c.x1 + c.xW - 20 &&
                    mouseX < c.x1 + c.xW &&
                    mouseY > c.y1 + c.yH - 20 &&
                    mouseY < c.y1 + c.yH &&
                    c.type != "card"
                ) { 
                    c.resizing = true;
                    c.resizeStartX = mouseX;
                    c.resizeStartY = mouseY;
                    c.resizeStartW = c.xW;
                    c.resizeStartH = c.yH;
                } else {
                    c.resizing = false;
                }
            }

            // audio player buttons
            if (c.type == "audio") {
                const bar = c.progressBar;
                if (
                    mouseX >= bar.x &&
                    mouseX <= bar.x + bar.w &&
                    mouseY >= bar.y &&
                    mouseY <= bar.y + bar.h
                ) {
                    const audio = backgroundMusic[0].audio;

                    if (audio.duration && !isNaN(audio.duration)) {
                        const percent = (mouseX - bar.x) / bar.w;

                        audio.currentTime =
                            percent * audio.duration;
                    }
                }
                // audio controls    
                for (const button of c.audioButtons) {
                    if (
                        mouseX >= button.x &&
                        mouseX <= button.x + button.w &&
                        mouseY >= button.y &&
                        mouseY <= button.y + button.h
                    ) {
                        handleAudioButton(button.action);
                        break;
                    }
                }
            }

            // mail buttons
            if (c.type == "mail") {
                // clicked an auth field
                if (c.authMode) {
                    const fW = c.xW / 4;
                    const fH = c.yH / 10;
                    for (let i = 0; i < 3; i++) {
                        
                        if (
                            mouseX > c.x1 + (c.xP/3) - (fW/2) &&
                            mouseX < c.x1 + (c.xP/3) - (fW/2) + (c.xP/1.8) &&
                            mouseY > c.y1 + (c.yP/3) - (fH/4) + (c.yP/5 * i) &&
                            mouseY < c.y1 + (c.yP/3) - (fH/4) + (c.yP/5 * i) + (c.xP/15)
                        ) {
                            c.focusNum = i;
                            break;
                        }
                    }
                } else {
                    // controls    
                    for (const button of c.mailButtons) {
                        if (
                            mouseX >= button.x &&
                            mouseX <= button.x + button.w &&
                            mouseY >= button.y &&
                            mouseY <= button.y + button.h
                        ) {
                            handleMailButton(c, button.action);
                            break;
                        }
                    }
                }
            }

            break;
        }
    }
    
    if (!touchedCard && !player.cStored && player.cNotStoring) {
        // first check if clicking on empty stack
        if (
            mouseX > player.cX &&
            mouseX < player.cX + (100*player.cScale) &&
            mouseY > player.cY &&
            mouseY < player.cY + (140*player.cScale) &&
            player.cStack.length < 1
        ) {
            // player has clicked through the stack reset it
            resetCardStack();
        } else {
            // stop win animation 
            if (player.cWon) {
                player.cWon = false;
                purgeCardWindow();
                initSolitaire();
                return;
            }

            if (!player.cLock) {
                // otherwise store deck
                player.cNotStoring = false;
                player.cStored = true;

                for (let c of player.cardWindow) {
                    c.prevX = c.x1;
                    c.prevY = c.y1;
                    c.targetX = getWidth() - (100 * c.scale) - 1;
                    c.targetY = 1;
                }
            }
        }
    } else if (touchedCard && player.cStored && player.cNotStoring) {
        // unstore deck
        player.cNotStoring = false;
        player.cStored = false;
        for (let c of player.cardWindow) {
            c.targetX = c.prevX;
            c.targetY = c.prevY;
            c.prevX = getWidth() - (100 * c.scale) - 1;
            c.prevY = 1;
        }
    }

    // map
    if (notFound) {
        movingMap = true;
        oldOffX = mapXOff;
        oldOffY = mapYOff;
        mouseDownX = mouseX;
        mouseDownY = mouseY;
        let bSize = 0.5;

        // clicked city
        if (mapSteps >= mapStepsMax && player.drawCities) {
            for (let i = 0; i < cities.length; i++) {
                if (i < mapCitiesSteps) {
                    let city = cities[i];
                    if (city.population > player.cityPopulationThreshold) {
                        if (
                            mouseX > (city.lon * mapScale) + mapXOff - (bSize * mapScale/2) &&
                            mouseX < (city.lon * mapScale) + mapXOff + (bSize * mapScale) &&
                            mouseY > (-city.lat * mapScale) + mapYOff - (bSize * mapScale/2) &&
                            mouseY < (-city.lat * mapScale) + mapYOff + (bSize * mapScale)
                        ) {
                            // mouseDeatil is number of clicks, move 
                            // map to named location on doubleclick
                            if (mouseDetail == 2 && mouseUnclaimed) {
                                mapScale = 30;
                                mapXOff = (getWidth()/3*2) - (city.lon * mapScale);
                                mapYOff = (getHeight()/2) - (-city.lat * mapScale);
                                mapSteps = 1;
                                mapInc = 0;
                                mapCitiesSteps = 0;
                                mapNodeSteps = 0;
                                player.selCountry = city.country;
                                //console.log(player.selCountry);
                                cast[0].text = `Selected ${city.name}, ${city.country}`;
                                cast[0].setText(cast[0].text);
                                player.selectedCity = city;
                                updateMap = true;
                            }
                        }
                    }
                }
            }
        }
        
        // clicked node
        if (mapSteps >= mapStepsMax && player.drawNodes) {
            for (let i = 0; i < nodes.length; i++) {
                let node = nodes[i];
                if (i < mapNodeSteps && node.discovered) {
                    if (
                        mouseX > (node.longitude * mapScale) + mapXOff - (bSize * mapScale/2) &&
                        mouseX < (node.longitude * mapScale) + mapXOff + (bSize * mapScale) &&
                        mouseY > (-node.latitude * mapScale) + mapYOff  - (bSize * mapScale/2) &&
                        mouseY < (-node.latitude * mapScale) + mapYOff + (bSize * mapScale)
                    ) {
                        // mouseDeatil is number of clicks, move 
                        // map to named node on doubleclick
                        if (mouseDetail == 2 && mouseUnclaimed) {
                            mapScale = 50;
                            mapXOff = (getWidth()/3*2) - (node.longitude * mapScale);
                            mapYOff = (getHeight()/2) - (-node.latitude * mapScale);
                            mapSteps = 1;
                            mapInc = 0;
                            mapCitiesSteps = 0;
                            mapNodeSteps = 0;
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
                    } 
                }          
            }
        }
    }
}

function doMouseUp(e) {
    mouseX = e.x;
    mouseY = e.y;
    mouseDown = false;
    movingMouse = false;
    movingMap = false;
    mouseDetail = e.detail;
    mouseDownX = 0;
    mouseDownY = 0;
    player.ignoreMouseDrag = false;

    for (let w = 0; w < cast.length; w ++) {
        let c = cast[w];
        if (c.mouseDrag && !c.resizing) { // moving this window
            if (c.type == "card") {
                // match another card?
                for (let i of player.cardWindow) {
                    // don't match cards in stack or discard
                    if (!player.cStack.includes(i) && !player.cDiscard.includes(i)) {
                        // matched card must be shown 
                        // valid matches
                        // intersecting
                        // and be child free
                        if (
                            i.shown &&
                            isColumnMatch(c, i) &&
                            intersects(c, i) &&
                            i.childCard === 0
                        ) {
                            i.childCard = c;
                            c.parentCard = i;
                            c.x1 = i.x1;
                            c.y1 = i.y1 + (30 * player.cScale);
                            c.targetX = c.x1;
                            c.targetY = c.y1 
                            moveChildren(c);
                            break;
                        }
                    }
                }
                // placed on stack?
                if (
                    intersectsXY(
                        c,
                        player.cX,
                        100 * player.cScale,
                        player.cY,
                        140 * player.cScale
                    )
                ) {
                    // stack card never shown
                    c.shown = false;
                    c.targetX = player.cX;
                    c.targetY = player.cY;
                    // break the parent/child bond
                    if (c.parentCard) {
                        c.parentCard.childCard = 0;
                    }
                    c.childCard = 0;
                    player.cStack.push(c);
                // dropped on discard
                } else if (
                    intersectsXY(
                        c,
                        player.cX + (120 * player.cScale),
                        100 * player.cScale,
                        player.cY,
                        140 * player.cScale
                    )
                ) {
                    c.targetX = player.cX + (120 * player.cScale);
                    c.targetY = player.cY;
                    // break the parent/child bond
                    if (c.parentCard) {
                        c.parentCard.childCard = 0;
                    }
                    c.childCard = 0;
                    player.cDiscard.push(c);
                } else {
                    // snap in to aceholes
                    checkAceHoles(c);
                    // finally snap to empty columns
                    checkEmptyColumn(c);
                }
            }
        }
    }
    for (let w = 0; w < cast.length; w++) {
        let s = cast[w];
        s.mouseDrag = false;
        s.resizing = false;
        s.hasStartedDragging = false;
    }
}

function doKeyDown(e) {
    if (player.mailWindow && player.mailWindow.authMode) {
        player.mailWindow.authKeyHandler(e);
    } else {
        for (let i = 0; i < cast.length; i++) {
            // dont add v when pasting data
            if ((e.metaKey || e.ctrlKey) && e.code === "KeyV") {
                return;
            }
            if (cast[i].acceptInput) {
                cast[i].keyHandler(e);
            }
        }
    }
}

function handleAudioButton(button) {
    const audio = backgroundMusic[0].audio;
    switch (button) {

        case 0: // previous
            player.audioTrack --;
            if (player.audioTrack < 0) {
                player.audioTrack = player.audioPlaylist.length - 1;
            }
            setAudioSource(player.audioPlaylist[player.audioTrack], backgroundMusic);
            break;

        case 1: // play/pause

            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
            break;

        case 2: // stop
            audio.pause();
            audio.currentTime = 0;
            break;

        case 3: // next
            player.audioTrack ++;
            if (player.audioTrack > player.audioPlaylist.length-1) {
                player.audioTrack = 0;
            }
            setAudioSource(player.audioPlaylist[player.audioTrack], backgroundMusic);
            break;
    }
}

function handleMailButton(win, button) {
    switch (button) {

        case 0: // New
            break;

        case 1: // Reply
            break;

        case 2: // Delete
            break;

        case 3: // Quit
            win.toOpen = false;
            win.delete = true;
            break;
    }
}