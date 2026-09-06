class User {
    constructor() {
        this.name = locations[gUsers.length].homeowner;
        this.uName = this.name.split(" ")[0].substring(0,1).toLowerCase() + this.name.split(" ")[1].toLowerCase();
        this.cash = 100;
        this.crypto = 0;
        this.uid = gUsers.length;
        this.nodeStack = [this.uid];
        this.aniSpeed = 0.01;
        this.homeAddress = locations[gUsers.length].address;
        this.workAddress;
        this.tryAuthName;
        this.tryAuthPwd;
        this.authAccountIndex = 0; // current user starts a zero/admin
        this.askedForName = false;
        this.askedForPwd = false;
        this.windowHover = false;
    }
}

class Player extends User{
    constructor(name) {
        super();
        this.cardWindow = [];
        this.cleanSegment = 0;
        this.lastScanIP = [];
        this.cColumns = [[],[],[],[],[],[],[]];
        this.cHoles = [[],[],[],[]];
        this.cStack = [];
        this.cDiscard = [];
        this.cMoney = 100;
        this.cScale = 0.8;
        this.cStoredScale = 0.25;
        this.cStored = false;
        this.cNotStoring = true;
        this.cWon = false;
        this.cWonCard;
        this.cWonSpeed = 2;
        this.cX = null; // assigned on deck init
        this.cY = 20;
        this.compromisedComputers = [];
        this.name = name;
        this.uName = this.name.split(" ")[0].substring(0,1).toLowerCase() + this.name.split(" ")[1].toLowerCase();
        this.selCountry = nodes[0].country; // selected country on map, start at player's location
        this.focus;
        this.drawCities = true;
        this.drawNodes = true;
        this.drawNodeStack = true;
        this.cityPopulationThreshold = 100000;
        this.connectTo = 0;
        this.proxyWindow = [];
        this.readerWindow = [];
        this.unactivated = false;
        this.musicOn = false;
        this.musicVol = 50;
        this.audioPlayer = 0;
        this.audioTrack = 0;
        this.audioPlaylist = [];
        this.phoneMessage = "";
        this.t2s = false;
        // brute cracker
        this.bruteWindow = [];
        this.brutePwdIndex = 0;
        this.bruteFontSize = 16;
        this.bruteText = ""
        this.bruteBackgroundColor = '#980531'
        this.bruteRectColor = '#ffffff'
        this.bruteTextColor = '#f7faf8'
        this.bruteIsRounded = false;
        this.bruteHasBoarder = false;
        this.bX1 = getWidth()/25 * 11;
        this.bY1 = getHeight()/8;
        this.bXW = 300;
        this.bYH = 130;
        this.ignoreMouseDrag = false;
        // email client
        this.mailWindow = 0;
        this.mailFontSize = 16;
        this.mailText = ""
        this.mailBackgroundColor = '#565555'
        this.mailRectColor = '#ffffff'
        this.mailTextColor = '#f1f1f1'
        this.mailIsRounded = false;
        this.mailHasBoarder = false;
        this.mX1 = getWidth()/25 * 10;
        this.mY1 = getHeight()/10;
        this.mXW = 700;
        this.mYH = 500;
    }
}