// canvas defined in index.html
// c = document.getElementById("canvas");
// ctx = c.getContext("2d");
let debug = true;
let cast = []
let gUsers = [];
let player
let locations = [];
let map = [];
let mapScale = 3;
let mapXOff;;
let mapYOff;
let mapColor = '#c8cac8';
let updateMap = true;
let mapSteps = 0;
let mapStepsMax = 2;
let mapInc = 2;
let mapSel = [];
let cities = [];
let nodes = [];
let mapNodeSteps = 0;
let mapNodeStackSteps = 0;
let mapCitiesSteps = 0;

function init() {
    window.addEventListener('click', doClick);
    window.addEventListener('keydown', doKeyDown);  
    window.addEventListener('mousemove', doMouseMove);
    window.addEventListener('mousedown', doMouseDown);
    window.addEventListener('mouseup', doMouseUp);
    //window.addEventListener("keyup", kUp);
    window.addEventListener('resize', doResize);
    doResize();
    mapXOff = getWidth()/3 * 2;
    mapYOff = getHeight()/2;
    /*for (let i = 0; i < 5; i++) {
        let testRect = new aniRect(50, 20*i+(100*i), 50*i, 200*i);
        cast.push(testRect);
    }*/
    fetch('data/locations.json')
        .then(response => response.json())
        .then(data => locations = data)
        .then(result => {
            shuffle(locations);
            //speak(rooms[ego.room].desc)
            loadCities();
        })
        .catch(error => console.error('Error loading locations JSON file', error));
        
}

function loadCities() {
    fetch('data/cities.json')
        .then(response => response.json())
        .then(data => cities = data)
        .then(result => {
            //console.log(cities);
            shuffle(cities);

            //player = new user(prompt("enter player name:"));
            player = new Player("Robort Copeland");
            locations[0].homeowner = player.name;
            gUsers.push(player);

            let playersComp = new aniRect(getWidth()/20, getHeight()/8, getWidth()/3, getHeight()/1.5);
            playersComp.admins.push(0); // add player as admin to own computer
            cast.push(playersComp);
            ctx.font = scaleFont(playersComp.textScale * playersComp.xW, playersComp.textFont);
            loadNodes()
        })
        .catch(error => console.error('Error loading cities JSON file', error));
}

function loadNodes() {
    fetch('data/nodes.json')
        .then(response => response.json())
        .then(data => nodes = data)
        .then(result => {
            //console.log("nodes: " + nodes);
            shuffle(nodes);
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].city = cities[i].name;
                nodes[i].country = cities[i].country;
                nodes[i].latitude = cities[i].lat;
                nodes[i].longitude = cities[i].lon;
                nodes[i].dicovered = false;
            }
            loadMap();
        })
        .catch(error => console.error('Error loading node JSON file', error));
}

function loadMap() {
    fetch('data/countries.json')
        .then(response => response.json())
        .then(data => map = data)
        .then(result => {
            //console.log(map);
            map = map.features;
            requestAnimationFrame(frame);
        })
        .catch(error => console.error('Error loading map JSON file', error));
}

function frame(timestamp) {
    draw();
    requestAnimationFrame(frame);
}
