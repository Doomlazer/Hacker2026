function doResize() {
    c.width = getWidth() - 20;
    c.height = getHeight() - 40;
    cMap.width = getWidth() - 20;
    cMap.height = getHeight() - 40;
}

function getWidth() {
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

function getHeight() {
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

function getRandInt(i) {
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