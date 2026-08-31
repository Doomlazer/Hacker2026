function generateGiberish(length) {
    let source = 'J¥®—£Hì*]¥©” ßP£aqwJùJµ™X≥jµ◊ë¬äK¿◊≥gÀ™]Àv,∑L€ùKÆ]ûtÛ\nÍ{∑ØÀΩd-VÎ∑0»¡fÕ2±·«+v(Y!»ò->òX2ﬂÑy3ã÷∫' +
    'mA±C+∫ØÍÑQÂwjo2i<∑uŸ¥. äK±Ïi∂≥ˇÕªdÏåuπ@@ç—˜@” übøNeÒÁ“5Büæ=\n˚Q∂ƒ√ß~˝pwkÕçØw3 e\n3 K—ﬂ£óˇì>·óﬂw\tÂÒg”~∏/ÈÁüÅ3_L„ŸGûbÿò' +
    'ÉAÿá*8^F"Nò\t†Ä ãqòwerúádyff5s≤Ie\t8bÜΩ¯¢®  3^wjÿ¢wt¬HRê,ÜòB4 doi 2fj<.i!tâq\tGÈë>vV$B∫Ê†éÌ·sd9ver\tveusd„≥∂zõµeP3Ïˇ‡Äï1hr' +
    'l˚ÕÿíAZ\nYà‰m†ôPgi;  ißófû9ÇjF ∆Êñ tÜ«ÊÖc÷g\nhidÇ9¶[N‰†ˇ}>$£ èö…€åvöcz{Z◊ËóQi§ ïx®‡%*%ä:h®   ùéJj±Nâß¢án:‰' +``
    'ãçrÙhû∑ÈÍ FOàÍáy¡≈\nÇ8+r«y#•Ÿ“∞\tÕ∂é2+∏2usdfwese„≥∂WEFW Ez õúπg“∆∑”f,πÌ*g ºVJ˚ë®}nú˚Ry+öÏ÷\ta¡%Y,°w0Ω"Ïp≠ø¬Ÿé±W«≈' +
    'ãÒ∂ Ëkóæ\n®1d«≈hmÑmº\nuÈ~upfefefRñ™%¥BÖU . û∫e!Œ¥\näåûBksµÆœ3wÃÓ¥“™—@•—4ÈÏÒTP3ÖˇTsÌh«u0WYÁT6LÆΩí\txXHµ\nÆNnõ§•±Y2mÕc”Å◊-' +
    'Èlµ6$¯ﬁ4^ï6Ÿ c˚lãMGqôﬁNUœ. \n  Ä«çï≥6\tNy¿_GÖ9„fw8>€∑efefefgeØer^+ïíöü€zer\ngeåØsdff\ne˘π≥ñ;≈:Ÿª≈nÔØ∫OY˚R∑s∫§m÷X|ÓΩüJtÚ¬XÓç/¨‰7ÇÃ|' +
    '∏|´Ã„Û◊ß«π¬÷?\n 67Øe∫ﬂŒ≥ƒƒSﬂr≥# y>≤Àwø^óÚ^?ßÒ«ÁŸ ﬁˇyPJ5 6Ï£bnhi    owKm™®ÛtiNqÊ¿©∞2Q\tíù…eefeffexfÚª®5î¥∫÷>?ôMZ£ßF©' +
    'D·}*¯≤Ì±D`7Ï÷hæÇ Jjaò\tﬁ/™©pM9LEHDGÉ+¢\tŸ45øÒf1ÏU™¨\n«¢¿±Îà23Qî\t†i»∏=%ëUìõ7?ΩœÉ!™!€àøÄÒ\npw0 vwƒ\t96?JT1÷÷ñ&√ë±yWæP¬pâÊµ™Ö' +
    'úrI-ïππ\nei7é!¥46é∫Óq~ tó˚níÀÍ¿J\nñˇmnÛám|ï-ÉIqéÛM?4g‰ ÑπBoõÌ<êR¥*í\nôÓÉ∞∏efef‡¿©úMt1$¢ ÛêÂí£@=E≈AíÍ.    ';

    let str = "";
    let l = source.length - 5;
    for (let i = 0; i < l; i ++) {
        let r = getRandInt(l);
        str += source.slice(r, r + getRandInt(5));
    }

    return str;
}

async function createFS(n) {

    const fs =
        await FileSystem.load(n);


    if (fs.existsOnDisk) {
        // already exists
        return fs;
    }

    if(!nodes[n]) {
        console.error("MISSING NODE:",n);
        throw new Error(`nodes[${n}] does not exist`);
    }

    if(!nodes[n].accounts) {
        console.error("MISSING ACCOUNTS:",n,nodes[n]);
        throw new Error(`nodes[${n}].accounts does not exist`);
    }

    if(!nodes[n].accounts[1]) {
        console.error("MISSING ACCOUNT[1]:",n,nodes[n]);
        throw new Error(`nodes[${n}].accounts[1] does not exist`);
    }

    const user =
        nodes[n].accounts[1].user;


    //==================================================
    // Folders
    //==================================================

    fs.createFolder(
        "C:\\Users",
        0,
        0
    );

    fs.createFolder(
        "C:\\Users\\root",
        0,
        0
    );

    fs.createFolder(
        `C:\\Users\\${user}`,
        1,
        0
    );

    fs.createFolder(
        `C:\\Users\\${user}\\Desktop`,
        1,
        0
    );

    fs.createFolder(
        `C:\\Users\\${user}\\Documents`,
        1,
        0
    );

    fs.createFolder(
        `C:\\Users\\${user}\\Music`,
        1,
        0
    );


    fs.createFolder(
        "C:\\System",
        0,
        0
    );

    fs.createFolder(
        "C:\\System\\logs",
        0,
        0
    );

    fs.createFolder(
        "C:\\System\\bin",
        0,
        0
    );


    //==================================================
    // Files
    //==================================================

    fs.createFile(
        "C:\\config.cfg",
        0,
        0,
        generateGiberish(
            getRandInt(200) + 200
        ),
        0
    );


    fs.createFile(
        "C:\\System\\logs\\logs.txt",
        0,
        0,
        nodes[n].ip_address + "\nnode.id " + nodes[n].id +
        "\nLOG FILE:\n",
        0
    );


    //==================================================
    // Standard commands
    //==================================================

    fs.createFile(
        "C:\\System\\bin\\exit",
        0,
        0,
        generateGiberish(32),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\ls",
        0,
        0,
        generateGiberish(63),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\ulist",
        0,
        0,
        generateGiberish(23),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\read",
        0,
        0,
        generateGiberish(113),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\cd",
        0,
        0,
        generateGiberish(12),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\pwd",
        0,
        0,
        generateGiberish(42),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\ssh",
        0,
        0,
        generateGiberish(32),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\clear",
        0,
        0,
        generateGiberish(32),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\su",
        0,
        0,
        generateGiberish(32),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\mail",
        0,
        0,
        generateGiberish(62),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\reg",
        0,
        0,
        generateGiberish(42),
        0
    );

    fs.createFile(
        "C:\\System\\bin\\date",
        0,
        0,
        generateGiberish(102),
        0
    );

    //==================================================
    // Player computer
    //==================================================

    if (n === 0) {

        fs.createFile(
            "C:\\System\\bin\\setparam",
            0,
            0,
            generateGiberish(62),
            0
        );

        fs.createFile(
            "C:\\System\\bin\\fullscreen",
            0,
            0,
            generateGiberish(142),
            0
        );

        fs.createFile(
            "C:\\System\\bin\\scan",
            0,
            0,
            generateGiberish(172),
            0
        );

        fs.createFile(
            "C:\\System\\bin\\map",
            0,
            0,
            generateGiberish(372),
            0
        );

        fs.createFile(
            "C:\\System\\bin\\speak",
            0,
            0,
            generateGiberish(113),
            0
        );

        fs.createFile(
            "C:\\System\\bin\\hangup",
            0,
            0,
            generateGiberish(42),
            0
        );

        fs.createFile(
            "C:\\System\\bin\\dial",
            0,
            0,
            generateGiberish(32),
            0
        );

        fs.createFile(
            "C:\\System\\bin\\audio",
            0,
            0,
            generateGiberish(234),
            0
        );

        fs.createFile(
            "C:\\System\\bin\\help",
            0,
            0,
            generateGiberish(23),
            0
        );

        fs.createFile(
            "C:\\System\\bin\\deck",
            0,
            0,
            generateGiberish(116),
            0
        );

        fs.createFile(
            "C:\\System\\bin\\brute",
            0,
            0,
            generateGiberish(33),
            0
        );
        fs.createFile(
            "C:\\System\\bin\\mal",
            0,
            0,
            generateGiberish(3),
            0
        );

        fs.createFile(
            "C:\\System\\bin\\dnslookup",
            0,
            0,
            generateGiberish(33),
            0
        );

        fs.createFile(
            `C:\\Users\\${user}\\Documents\\phrack.txt`,
            0,
            0,
            phrack,
            0
        );
    }


    if (locpnum == n) {
        fsVid30Dr0mEE(fs, n)
    }

    //==================================================
    // Attributes
    //==================================================

    fs.setAttributes(
        "C:\\System",
        {
            readOnly: false,
            system: true
        },
        0
    );


    fs.setAttributes(
        "C:\\Users\\root",
        {
            readOnly: false,
            system: true
        },
        0
    );

    await fs.save();

    return fs;
}

function fsDNS(fs, ip, n) {
    fs.createFolder(
        `C:\\System\\DNS`,
        1,
        0
    );
    fs.createFile(
        `C:\\System\\DNS\\entries.txt`,
        0,
        0,
        JSON.stringify(DNSKeys),
        0
    );
    //console.log("sssss" + fs.readFile(`C:\\System\\DNS\\entries.txt`, 0))
    fs.createFile(
        `C:\\System\\bin\\dns`,
        0,
        0,
        generateGiberish(23),
        0
    );
    nodes[n].ip_address = ip;
}

function fsVid30Dr0mEE(fs, n) {
    //
    // Mal90 Author, 15 yrld nerd
    //
    fs.createFolder(
        `C:\\Users\\Vid30Dr0mEE`,
        1,
        0
    );

    nodes[n].accounts.push({"user": "Vid30Dr0mEE", "pwd":"password", "admin": true, "userId":n})
    fs.createFolder(
        `C:\\Users\\Vid30Dr0mEE`,
        1,
        0
    );

    fs.createFolder(
        `C:\\Users\\Vid30Dr0mEE\\Desktop`,
        1,
        0
    );

    fs.createFolder(
        `C:\\Users\\Vid30Dr0mEE\\Documents`,
        1,
        0
    );

    fs.createFolder(
        `C:\\Users\\Vid30Dr0mEE\\Music`,
        1,
        0
    );

    fs.createFolder(
        `C:\\Users\\Vid30Dr0mEE\\Documents\\mal90`,
        1,
        0
    );
    fs.createFolder(
        `C:\\Users\\Vid30Dr0mEE\\Documents\\mal90\\SourceCode`,
        1,
        0
    );
    fs.createFolder(
        `C:\\Users\\Vid30Dr0mEE\\Documents\\mal90\\SourceCode\\TonySoft`,
        1,
        0
    );
    fs.createFile(
        `C:\\Users\\Vid30Dr0mEE\\Documents\\mal\\mal90.txt`,
        0,
        0,
        `ToDo:
        \tRemove spyware
        \tCalculatar App
        \tWindow click order`,
        0
    );
    fs.createFile(
        `C:\\Users\\Vid30Dr0mEE\\Documents\\mal90\\SourceCode\\TonySoft\\main.src`,
        0,
        0,
        generateGiberish(857),
        0
    );

    fs.createFile(
        `C:\\Users\\Vid30Dr0mEE\\Documents\\waterCycle.txt`,
        0,
        0,
        `The Importance of the Water Cycle
        by Larry ${locations[n].homeowner.split(" ")[1]}
        Ms. Thompsons class
        Grade 11

The water cycle is the continuous movement of water through Earth’s atmosphere, land, and oceans. It is an important natural process because it provides fresh water for plants, animals, and people. Water changes forms as it moves through the cycle, becoming a liquid, solid, or gas. The main stages of the water cycle are evaporation, condensation, precipitation, and collection.

Evaporation occurs when the Sun heats water in oceans, lakes, rivers, and other bodies of water. The heat changes liqiud water into water vapor, which rises into the atmosphere. Plants also release water vapor through a process called transpiration. Together, evaporation and transpration add moisture to the air.

As water vapor rises, it cools and changes into tiny water droplets. This process is called condensation. The droplets gather around small particles in the atmosphere and form clouds. When enough water collects in the clouds, the droplets become heavy and fall back to Earth as precipitation.

Precipitation can take many forms, including rain, snow, sleet, and hail. After it reaches the ground, water may flow into rivers and oceans, soak into the soil, or become stored as ice and groundwater. This stage is called collection. Eventually, the Sun heats the water again, and the cycle repeats.

In conclusion, the water cycle is essential to life on Earth. It continuously recycles water and distributes it across the planet. Without this process, many living things would not have enough fresh water to survive. By understanding the water cycle, people can better appreciate the importance of protecting water resources.`,
        0
    );
}

function spawnReadWin(win, text) {
    // a text reader window
    let rw = new aniRect(win.rX1 + (player.readerWindow.length * 20),
                            win.rY1 + (player.readerWindow.length * 20), 
                            win.rXW, win.rYH);
    rw.fontSize = win.readerFontSize;
    rw.acceptInput = false;
    rw.backgroundColor = win.readerBackgroundColor;
    rw.rectColor = win.readerRectColor;
    rw.textColor = win.readerTextColor
    rw.isRounded = win.readerIsRounded;
    rw.hasBoarder = win.readerHasBoarder;
    rw.type = "reader";
    rw.originalText = text;
    cast.push(rw);
    player.readerWindow.push(rw);
    rw.setText(text, false);
    win.setText("Opening...");
}

function spawnCardWin(card, x, y, scale) {
    // a text reader window
    let cw = new aniRect(x,// + (player.cardWindow.length * 20),
                            y,// + (player.cardWindow.length * 20), 
                            100*scale, 140*scale);
    //rw.fontSize = win.readerFontSize;
    cw.acceptInput = false;
    cw.x1 = getWidth();
    cw.y1 = 10;
    cw.backgroundColor = '#fdfdfd';
    cw.rectColor = '#ff0000';
    cw.textColor = '#58e5fa';
    cw.isRounded = false;
    cw.hasBoarder = false;
    cw.type = "card";
    cw.card = card;
    cw.scale = scale;
    cw.targetScale = scale;
    cw.shown = false;
    cw.prevX;
    cw.pervY = 10;
    cw.targetX = x;
    cw.targetY = y;
    cw.childCard = 0;
    cw.parentCard = 0;
    cw.cardLines = cardVector(cw.card, 0, 0, cw.scale);
    cast.push(cw);
    player.cardWindow.push(cw);
    //rw.setText(text, false);
    
    return cw;
}

function spawnAudioWin(win, command) {
    // the audio player window
    let aw = new aniRect(win.aX1, win.aY1, win.aXW, win.aYH);
    aw.fontSize = win.audioFontSize;
    aw.acceptInput = false;
    aw.backgroundColor = win.audioBackgroundColor;
    aw.rectColor = win.audioRectColor;
    aw.textColor = win.audioTextColor
    aw.isRounded = win.audioIsRounded;
    aw.hasBoarder = win.audioHasBoarder;
    aw.type = "audio";
    aw.setText("");
    player.audioPlayer = aw;
    cast.push(aw);
}

function spawnProxyWin(win) {
    // the proxy list window
    let pw = new aniRect(win.pX1, win.pY1, win.pXW, win.pYH);
    pw.fontSize = win.proxyFontSize;
    pw.acceptInput = false;
    pw.backgroundColor = win.proxyBackgroundColor;
    pw.rectColor = win.proxyRectColor;
    pw.textColor = win.proxyTextColor
    pw.isRounded = win.proxyIsRounded;
    pw.hasBoarder = win.proxyHasBoarder;
    pw.type = "proxy";
    cast.push(pw);
    player.proxyWindow.push(pw);
    win.setProxyText();
}

function spawnMailWin() {
    // the email client window
    let mw = new aniRect(player.mX1, player.mY1, player.mXW, player.mYH);
    mw.fontSize = player.mailFontSize;
    mw.acceptInput = false;
    mw.backgroundColor = player.mailBackgroundColor;
    mw.rectColor = player.mailRectColor;
    mw.textColor = player.mailTextColor
    mw.isRounded = player.mailIsRounded;
    mw.hasBoarder = player.mailHasBoarder;
    mw.promptChar = "";
    mw.authMode = true;
    mw.host = "CyberSnail.com";
    mw.user = "demo";
    mw.password = "ds1$f0jsd2ofji"
    mw.type = "mail";
    cast.push(mw);
    player.mailWindow = mw;
    mw.text = ""; //generateGiberish(600);
}

function spawnBruteWin(win, command, ip, user, node) {
    // the ssh brute force cracker
    let i = player.bruteWindow.length;

    let bw = new aniRect(
        player.bX1 + (i * 10),
        player.bY1 + ((i * 20) % (getHeight()/2)),
        player.bXW,
        player.bYH
    );
    bw.fontSize = player.bruteFontSize;
    bw.acceptInput = false;
    bw.backgroundColor = player.bruteBackgroundColor;
    bw.rectColor = player.bruteRectColor;
    bw.textColor = player.bruteTextColor
    bw.isRounded = player.bruteIsRounded;
    bw.hasBoarder = player.bruteHasBoarder;
    bw.type = "brute";
    bw.ip = ip;
    bw.user = user;
    bw.bNode = node.id;
    bw.loops = 0;
    bw.time = gameTimer.timerStart()
    bw.setText(user + "@" + ip);
    bw.tryAuthPwd = 0;

    let notFound = true;
    // try to match an account username
    for (let i = 0; i < node.accounts.length; i++) {
        //console.log(`node.accounts[${i}].user  ` + node.accounts[i].user )
        //console.log(`user ${user}`)
        if (node.accounts[i].user == user) {
            // the entered username was valid, 
            // so ask for pwd next command
            notFound = false;
            bw.authAccountIndex = i;
        }
    }
    if (notFound) {
        win.setText(`User account ${user} not found on ${ip}`);
        win.delete = true
        return;
    }
    bw.cracked = false;
    player.bruteWindow.push(bw);
    cast.push(bw);
}

function createAccounts(n) {
    let movie = ["god","love","money","secert","sex","joshua", "swordfish"];

    let pwd = "";
    let r = getRandInt(100)
    if (r > 35) {
        // sort of strong
        pwd = passwords[getRandInt(passwords.length-1)] + getRandInt(999);
    } else if (r < 5) {
        // movie
        pwd = movie[getRandInt(movie.length-1)];
    } else {
        // bad
        pwd = passwords[getRandInt(passwords.length-1)]
    }

    let a = [{"user": "root", "pwd":pwd, "admin": true, "userId":0}];

    if (n < locations.length) {
        let f;
        let last;
        let uname;
        let pwd; 

        // Vary generated usernames 
        let r = getRandInt(100);
        if (r < 50) {
            // first inital + lastname
            f = locations[n].homeowner.split(" ")[0].substring(0,1).toLowerCase();
            last = locations[n].homeowner.split(" ")[1].toLowerCase();
            uname = f + last;
        } else if (r < 75){
            // full first + full last
            f = locations[n].homeowner.split(" ")[0].toLowerCase();
            last = locations[n].homeowner.split(" ")[1].toLowerCase();
            uname = f + last;
        } else if (r < 85) {
            // just last name
            uname = locations[n].homeowner.split(" ")[1].substring(0,1).toLowerCase();
        } else {
            // just first name
            uname = locations[n].homeowner.split(" ")[0].toLowerCase();
        }

        // make every 256 nodes an email host, but not node 0
        if (n % 256 == 0 && n != 0) {
            let e = n / 256 - 1;
            if (e < emailProviders.length) {
                DNSKeys[emailProviders[e].toLocaleLowerCase()] = nodes[n].ip_address;
                //console.log(`e: ${e}, DNSKeys ${DNSKeys}`);
                nodes[n].type = "eMail Server"
                nodes[n].text = `${emailProviders[e]} eMail Host Sever v2.58`
            }
        }

        // assign email account to random email service
        let host = emailProviders[getRandInt(emailProviders.length)]
        let eAddress = uname + "@" + host;
        locations[n].email = eAddress;

        // some passwords will match if run against the password table 
        // others have random numbers on the end, which are harder to crack
        if (getRandInt(100) > 75) {
            pwd = passwords[getRandInt(passwords.length)] + getRandInt(999)
        } else {
            pwd = passwords[getRandInt(passwords.length)];
        }

        let b = {"user": uname, "pwd": pwd, "admin": true, "userId": 1};
        
        a.push(b);
        
        nodes[n].id = n;
        nodes[n].compromisedAccounts = [];
        nodes[n].accounts = a;
        nodes[n].lastAuthAccount = -1;
        
        // assign primary and secondary DNS
        nodes[n].dns = [];
        nodes[n].dns.push(DNSServers[getRandInt(DNSServers.length)]);
        nodes[n].dns.push(DNSServers[getRandInt(DNSServers.length)]);

        nodes[n].telephone = generatePhoneNumber(nodes[n].country);

        nodes[n].logFile = "C:\\System\\logs\\logs.txt";
    }
}

function attachNode(window, node) {
    window.node = node;
    window.promptChar = node.promptChar;
    window.text = node.text;
    window.fileSystem = FileSystem[node.id];
}


function generateIPs(count = 10_000) {
  const ips = new Set();

  // Ranges that should not be generated for fake WAN addresses.
  const reserved = [
    [0, 0, 0, 255],       // 0.0.0.0/8
    [10, 0, 0, 255],      // 10.0.0.0/8
    [100, 64, 0, 255],    // 100.64.0.0/10
    [127, 0, 0, 255],     // 127.0.0.0/8
    [169, 254, 0, 255],   // 169.254.0.0/16
    [172, 16, 31, 255],   // 172.16.0.0/12
    [192, 0, 0, 255],     // 192.0.0.0/24
    [192, 0, 2, 255],     // TEST-NET-1
    [192, 168, 0, 255],   // 192.168.0.0/16
    [198, 18, 19, 255],   // benchmark networks
    [198, 51, 100, 255],  // TEST-NET-2
    [203, 0, 113, 255],   // TEST-NET-3
    [224, 0, 0, 255],     // multicast+
  ];

  function isReserved(a, b, c) {
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      a === 224 ||
      a >= 240 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 192 && b === 0) ||
      (a === 198 && (b === 18 || b === 19 || b === 51)) ||
      (a === 203 && b === 0)
    );
  }

  while (ips.size < count) {
    const a = 1 + Math.floor(Math.random() * 223);
    const b = Math.floor(Math.random() * 256);
    const c = Math.floor(Math.random() * 256);
    const d = Math.floor(Math.random() * 256);

    if (!isReserved(a, b, c)) {
      ips.add(`${a}.${b}.${c}.${d}`);
    }
    if (ips.size % 100 == 0) {
        //console.log(ips.size)
    }
  }

  return [...ips];
}

function doBrute() {
    for (let i = 0; i < player.bruteWindow.length; i++) {
        const c = player.bruteWindow[i];
        if (c.type == "brute" && c.cracked == false) {
            //let stack = player.nodeStack;
            let node = nodes[c.bNode];
            let account = node.accounts[c.authAccountIndex];

            c.displayLines = [];

            // test password
            let p;
            if (c.loops > 0) {
                p = passwords[c.tryAuthPwd] + c.loops;
            } else {
                p = passwords[c.tryAuthPwd];
            }
            if (account.pwd == p) {
                c.cracked = true;
                let t = gameTimer.timer(c.time);
                c.text = `${c.user}@${c.ip}
                            ${node.city}, ${node.country}
                            Welcome, ${account.user}
                            Password: ${account.pwd}
                            elapsed: ${t.days}:${t.hours}:${t.minutes}:${t.seconds}`;
                c.setText(c.text, false);
                let str = `${gameTimer.formatted()} - ${c.ip} authenitcated with account ${account.user}\n`
                node.fileSystem.appendFile(node.logFile, str);
                node.compromisedAccounts.push(c.authAccountIndex);
                player.compromisedComputers.push(c.ip);
                //console.log(player.compromisedComputers);
                node.fileSystem.save();
                //console.log(node.fileSystem.readFile(node.logFile))
                c.backgroundColor = '#05a805';
            } else {
                //console.log(`${c.user}@${c.ip}\nTrying ${player.tryAuthPwd}\n(${i} of ${passwords.length})`)
                let t = gameTimer.timer(c.time);
                c.text =`${c.user}@${c.ip}
                        ${node.city}, ${node.country}
                        Trying - ${p}
                        (${c.tryAuthPwd} of ${passwords.length} * ${c.loops})
                        elapsed: ${t.days}:${t.hours}:${t.minutes}:${t.seconds}`;
                c.setText(c.text, false);
                logFailedAuth(c, node, c.user);
                
                c.tryAuthPwd ++;
                if (c.tryAuthPwd >= passwords.length) {
                    c.tryAuthPwd = 0;
                    c.loops ++;
                }   
            }
        }
    }
}

function doCleanLogs() {
    let chunk = 50;
    const end = Math.min(
        player.cleanSegment + chunk,
        locations.length
    );
    for (let i = player.cleanSegment; i < end; i ++ ) {
        let fs = nodes[i].fileSystem;
        //console.log("fs " + fs + " node: " + nodes[i].id)
        let changed = false;
        let j = fs.readFile("C:\\System\\logs\\logs.txt", 0);
        j = j.split("\n");
        while (j.length > 100) {
            j = j.slice(-100);
            console.log("cleaned node: " + i)
            changed = true;
        }
        if (changed) {
            if (j.lenght > 1) {
                j = j.join('\n');
            }
            fs.writeFile("C:\\System\\logs\\logs.txt", j, 0);
            fs.save();
        }
    }
    player.cleanSegment += chunk;
    if (player.cleanSegment > nodes.length) {
        player.cleanSegment = 0;
        player
    }
}

function setWindowPri(win) {
    // PRIORITY
    if (win.pri != 0) {
        win.pri = cast.length; // set max pri
        // downgrade the others
        for (let i = 0; i < cast.length; i++) {
            if (cast.indexOf(win) != i) {
                cast[i].pri --;
            }
        }
    }
}


let phrack = `
                                  _  _       _______
                                 | \/ |     / _____/
                                 |_||_|etal/ /hop
                                 _________/ /
                                /__________/
                                 (314)432-0756
                         24 Hours A Day, 300/1200 Baud

                                  Presents....

                                ==Phrack Inc.==
                     Volume One, Issue One, Phile 1 of 8

                                Introduction...

Welcome to the Phrack Inc. Philes.  Basically, we are a group of phile writers
who have combined our philes and are distributing them in a group.  This
newsletter-type project is home-based at Metal Shop.  If you or your group are
interested in writing philes for Phrack Inc. you, your group, your BBS, or any
other credits will be included.  These philes may include articles on telcom
(phreaking/hacking), anarchy (guns and death & destruction) or kracking.  Other
topics will be allowed also to an certain extent.  If you feel you have some
material that's original, please call and we'll include it in the next issue
possible.  Also, you are welcomed to put up these philes on your BBS/AE/Catfur/
Etc.  The philes will be regularly available on Metal Shop.  If you wish to say
in the philes that your BBS will also be sponsering Phrack Inc., please leave
feedback to me, Taran King stating you'd like your BBS in the credits.  Later
on.

                                            TARAN KING
                                            2600 CLUB!
                                         METAL SHOP SYSOP


This issue is Volume One, Issue One, released on November 17, 1985.  Included
are:
1  This Introduction to Phrack Inc. by Taran King
2  SAM Security Article by Spitfire Hacker
3  Boot Tracing on Apple by Cheap Shades
4  The Fone Phreak's Revenge by Iron Soldier
5  MCI International Cards by Knight Lightning
6  How to Pick Master Locks by Gin Fizz and Ninja NYC
7  How to Make an Acetylene Bomb by The Clashmaster
8  School/College Computer Dial-Ups by Phantom Phreaker

Call Metal Shop and leave feedback saying the phile topic and where you got
these philes to get your article in Phrack Inc.



                                   _  _       _______
                                  | \/ |     / _____/
                                  |_||_|etal/ /hop
                                  _________/ /
                                 /__________/
                                 (314)432-0756
                         24 Hours A Day, 300/1200 Baud

                                  Presents...

                                ==Phrack Inc.==
                     Volume One, Issue One, Phile 2 of 8

   ::>Hacking SAM - A Description Of The Dial-Up Security System<::
                       ::>Written by Spitfire Hacker<::

     SAM is a security system that is being used in many colleges
today as a security feature against intrusion from the outside.  This
system utilizes a dial-back routine which is very effective.  To
access the computer, you must first dial the port to which SAM is
hooked up.  The port for one such college is located at (818) 885-
2082.  After you have called, SAM will answer the phone, but will make
no other responses (no carrier signals).  At this point, you must
punch in a valid Login Identification Number on a push-button phone.
The number is in this format -- xxyyyy -- where xx is, for the number
mentioned above, 70.  'yyyy' is the last 4 digits of the valid user's
telephone number.
     If a valid LIN is entered, SAM will give one of 3 responses:
1) A 1 second low tone
2) A 1 second alternating high/low tone
3) A tone burst

Responses 1 and 2 indicate that SAM has accepted your passcode and is
waiting for you to hang up.  After you hang up, it will dial the valid
users phone number and wait for a second signal.

Response 3 indicates that all of the outgoing lines are busy.

If SAM accepts your passcode, you will have to tap into the valid
users line and intercept SAM when it calls.  If you do this, then hit
the '*' key on your phone.  SAM will respond with a standard carrier,
and you are in!

That's all that I have hacked out so far, I will write more
information on the subject later.

     -%>Spitfire Hacker<%-
           2600 Club!




                                ==Phrack Inc.==
                     Volume One, Issue One, Phile 3 of 8

//////////////////////////////////////////////////////////////////////////////
/                                                                            /
/                           Boot Tracing Made Easy                           /
/                                 Written by                                 /
/                              ________________                              /
/                              \Cheap/ \Shades/                              /
/                               \___/   \____/                               /
/                                 2600 CLUB!                                 /
/                                                                            /
//////////////////////////////////////////////////////////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
\                                     \
\           Be sure to call           \
\                                     \
\  Kleptic Palice......(314)527-5551  \
\    5 Meg BBS/AE/CF                  \
\  Metal Shop..........(314)432-0756  \
\    Elite BBS  (Home of 2600 CLUB!   \
\                and Phrack Inc. )    \
\                                     \
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

About 3 or four years ago, a real good friend of mine was teaching a ML
Programming course for the Apple 2 series.  I, being a good friend and
quite bored, asked him about cracking Apple games.  He told me that he had
spent the last summer cracking programs.  He showed me a method that he came
up with entirely on his own, boot tracing.  Little did he know that this was
already quite popular but he developed his own method for doing it which from
reading other files about it, is the simplest I've ever seen.  (To give you
an idea, I had SN0GGLE (I've never played the game but a friend had it on
disk.) completely loaded into memory ready to be dumped in about 12 minutes.)
Ok, first of all, ALL programs can be boot traced. The only thing is that some
may not be easily converted into files.  The only programs that you should try
if you aren't real good at ML, are ones that load completely into memory. Also
to do this you will need a cassette recorder. (don't worry the program we will
save won't take too long to save, and if all goes well it will only be saved
loaded once.) I hate learning the theory behind anything so I'm not gonna
give any theory behind this. If you want the theory, read some other phile
that does this the hard way.

First make sure your cassette recoder works by BLOADing some program and
typing:
CALL -151
AA60.AA73
You'll see something that looks like this:
AA60-30 02 xx xx xx xx xx xx
AA68-xx xx xx xx xx xx xx xx
AA70-xx xx 00 08
or whatever...The 30 02 is the length ($0230 bytes). The 00 08 is the starting
address ($0800).  Oh well, now you need to try and save the program. Type:
800.A2FW   (A2F=$800+$230-1)
1000<800.A2FM
800:00 N 801<800.A2FM
800.A2FR
1000<800.A2FV

Once you are sure that the cassette works, (by the way do be stupid and try
that on a //c!) we can get to the good stuff...
First move the ROM boot-up code into RAM...(all steps will be from the
monitor * prompt.)
8600<C600.C6FFM
86F9:5C FF
(Now load in step 1 of the boot.)
8600G
C0E8  (turn the drive off)
(Now you have successfully loaded in track 0 sector 0) Now since we won't want
to overwrite what we've loaded in this time, Type:
8500<800.8FFM
86F9:01 85
8501L
Lets see what you've gotten...
First see if they move this part into the keyboard buffer. (A lot of programs
do this and the boot trace files that I've read don't even deal with this.)
LDX 00
LDA 800,X
STA 200,X
INX
BNE $803
JMP $211  (or any $2xx)
(sometimes done with Y's instead of X's.)
Then the next part will scramble what's in $08xx. but we don't have to worry
about that. Anyways find that JMP $2xx and change it to 4C xx 85 leaving the
xx the same. Usually this will be the next address but just to be safe...
Ok, now scan the code for any other JMP's if you find one that's direct
(indirect ones have the address in parenthesis) change it to 4C 5C FF, but
write down the location that it used to jump to first so you know where to
look.  It'll probably be 301 or B700. If it's the B700, you got lucky.  If it's
the 301 then you've got some more work ahead. If it was an indirect JMP, most
likely it was JMP ($003E). No if you change that to 4C 5C FF then check 3E
from monitor you'll find that 3E is 00 and 3F is 3E...Monitor uses that
place in zero page for its current memory location. So what you need to do is
8400:A5 3F 00 20 DA FD A5 3E 20 DA FD 4C 5C FF
then change that indirect jump to
85xx:4C 00 84
(by the way if the indirect jump is anything other than 3E then most likely
you can can just look at it from monitor if not write a little routine like
the one above to print out the address hidden. (Oh, check the location after
the next run. For now change it to 4C 5C FF.))
Anyways this little game will probably go on no longer than 2 or 3 loads, each
time just move the newly loaded part to another part of memory and change the
jump to jump to monitor (4C 5C FF) and the jump from the part before it to
go to the moved code.
When you find the part that JMP's up to a high area of memory (usually $B700)
you're almost done. The exit routine of the will most likely be the start of
the program.  Once you intercept it there, all you have to do now is save it to
cassette and re-load DOS.  The starting address for saving should be the
address that the B700 routine exits through. If this is higher than $6000 then
start saving at $2000 to get the Hi-Res pictures. Using WXYZ as your starting
address type:
WXYZ.9CFFW   (This will have the main program.)
800.WXYZW    (Save this are in case there is something needed down here we
              don't have to start over from scratch.)
Ok now reboot:
C600G   (with a DOS disk in the drive!)
CALL -151
WXYZ.9CFFR
Bsave PROGRAM,A$WXYZ,L$(Whatever 9CFF-WXYZ+1 is)
If the it gives you an error the file is too big. A quick DOS patch to fix
that is:
A964:FF
and try again.
Now that the program is saved, try and run it. (It's a good idea to take the
disk out of the drive, there's no telling what the program might try and do
if it sees that DOS is loaded in.)
WXYZG
(If it works, just to make sure that it's a good crack, power down the system
and try and BRUN it after a cold boot.)
If your saved the pictures with the program, most likely, it won't run. You
need to add a JMP at 1FFD to JMP to the main program. Then re-BSAVE it with a
starting address of A$1FFD, and add 3 to the length.  If the program tries to
go to the drive while its running, I'd suggest giving up unless you really
understand non-DOS disk usage. (but if you did you probably wouldn't be
reading this.)  If you get a break at an address less than $2000 then you need
to load in the second program that you saved to cassette. Put a jump in at
$800 to the main program and save the whole damn thing. If it still don't work
you're gonna need to really get fancy.
Now that you've got the thing running, it's time to figure out what is used and
what is just wasted memory. This is where I really can't help you but just
make sure that you keep a working copy and before every test power down the
machine to clear anything that might be remaining.

Have phun and good luck.....
                      ________________
                      \\Cheap/ \\Shades/
                       \\___/   \\____/
                         2600 CLUB!

Be sure and get a copy of PHRACK INC., available on finer BBS/AE's everywhere.
`