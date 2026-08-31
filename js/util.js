function doResize() {
    let w = getBrowserWidth()// - 20;
    let h = getBrowserHeight()// - 40;
    c.width = w;
    c.height = h;
    cMap.width = w;
    cMap.height = h;
    cMarkers.width = w;
    cMarkers.height = h;
    cCards.width = w;
    cCards.height = h;
    
    mapXOff = getWidth()/3 * 2;
    mapYOff = getHeight()/2;
    mapSteps = 0;
    mapInc = 0;
    mapCitiesSteps = 0;
    mapNodeSteps = 0;
    mapNodeStackSteps = 0;
}

function getBrowserWidth() {
    // multi-browser support
    if (self.innerWidth) {
    return self.innerWidth;
    }
    if (document.documentElement && document.documentElement.clientWidth) {
    return document.documentElement.clientWidth;
    }
    if (document.body) {
    return document.body.clientWidth;
    }
}

function getBrowserHeight() {
    if (self.innerHeight) {
    return self.innerHeight;
    }
    if (document.documentElement && document.documentElement.clientHeight) {
    return document.documentElement.clientHeight;
    }
    if (document.body) {
    return document.body.clientHeight;
    }
}

function getWidth() {
    return c.width;
}

function getHeight() {
    return c.height;
}

function getRandInt(i) {
    // non-inclusive i = 100 is 0-99
    return Math.floor(Math.random() * i);
}

function scaleFont(s, f) {
    return (c.width * s) + "px " + f;                     
}

function shuffle(array) {
    let t,r,l;
    l = array.length-1;
    while (l) {
        r = Math.floor(Math.random() * l)
        t = array[r]
        array[r] = array[l];
        array[l] = t;
        l--;
    }
}

function speak(text, queue = 0, voice = 0) {
    if (!queue) {
        window.speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);

    const voices = window.speechSynthesis.getVoices();
    utterance.onend = function(event) {
        if (debug) {
            //console.log('Speech has finished after ' + event.elapsedTime + ' seconds.');
        }
    };
    
    // Set voice
    if (voices.length > voice) {
        utterance.voice = voices[voice];
    } else {
        console.log('selected voice not available');
    }
    window.speechSynthesis.speak(utterance);
}

function createJSON(data, filename, mimeType = "application/json") {
    const json = JSON.stringify(data, null, 2);

    const blob = new Blob([json], { type: mimeType });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}

function drawFSProgress(current, total) {

    const width = 400;
    const height = 30;
    const x = 20;
    const y = 10;

    const progress = current / total;

    // Background
    ctx.fillStyle = "#222";
    ctx.fillRect(x, y, width, height);

    // Progress
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(
        x,
        y,
        width * progress,
        height
    );

    ctx.save();
    // Text
    ctx.fillStyle = "#fff";
    ctx.font = "16px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
        `Loading game data: ${current}/${total}`,
        x + width / 2,
        y + height / 2
    );
    ctx.restore();
}