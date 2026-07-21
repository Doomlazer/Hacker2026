class User {
    constructor() {
        this.cash = 100;
        this.crypto = 0;
        this.uid = gUsers.length;
        this.aniSpeed = 0.01;
        this.homeAddress = locations[gUsers.length].address;
        this.workAddress;
        this.textDisplayChar = 0;
    }
}

class Player extends User{
    constructor(name) {
        super();
        this.name = name;
        this.node = 0; // player's computer is always node zero
        this.selNodeNum = 0; // selected node on map
        this.selCountry = locations[gUsers.length].address.country; // selected country on map
        this.hopStack = [];
        this.focus;
        this.drawCities = false;
        this.drawNodes = true;
        this.selCountry = locations[gUsers.length].address.country;
    }
}