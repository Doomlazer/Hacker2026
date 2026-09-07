function commandHandler(win, mal = false) {
    const command = win.inputStr.split(" ").filter(Boolean);
    win.inputStr = "";

    // user typed nothing
    if (command.length < 1) {
       command.push("");
    }

    // Check if the player is entering a username or password,
    // if not procees the commands
    if (player.askedForName) {
        // check USERNAME
        let notFound = true;
        let stack = player.nodeStack;
        let node = nodes[stack[stack.length-1]];

        // the account name the player entered
        player.tryAuthName = command;

        // try to match an account username
        for (let i = 0; i < node.accounts.length; i++) {
            // this is for setting the players 
            // name at the start of the game
            if (player.unactivated && i == 1) {
                node.accounts[i].user = player.tryAuthName;
            }

            if (node.accounts[i].user == player.tryAuthName) {
                // the entered username was valid, 
                // so ask for pwd next command
                notFound = false;
                player.authAccountIndex = i;
                player.askedForName = false;
                player.askedForPwd = true;
                win.authTries = 0;
                win.text = `${node.ip_address}: Enter password`;
                win.setText(win.text);
            }
        }

        // didn't match any accounts on the system
        if (notFound) {
            win.authTries ++;
            if (win.authTries >= 3) {
                win.setText("Invalid user. Too many attempts\nDisconnected...");
                player.askedForName = false;
                win.authTries = 0;
                logSSHDisconnect(win, node);
                player.nodeStack.pop();
                attachNode(win, nodes[stack.length-1]);
                win.setProxyText();
            } else {
                win.setText("Invalid user. Enter username");
            }
        }
    } else if (player.askedForPwd) {
        // check user entered password

        let stack = player.nodeStack;
        let node = nodes[stack[stack.length-1]];
        let account = node.accounts[player.authAccountIndex];

        player.tryAuthPwd = command;

        // this is for setting the players password 
        // at the start of the game
        if (player.unactivated) {
            account.pwd = player.tryAuthPwd;
            player.unactivated = false;
        }

        // password was correct
        if (account.pwd == player.tryAuthPwd) {
            win.setText(`Welcome, ${account.user}`);
            let str = `${gameTimer.formatted()} - ${nodes[stack[stack.length-2]].ip_address} authenitcated with account ${account.user}\n`
            node.fileSystem.appendFile(node.logFile, str);

            // remember account for future auto authenitcation
            if (!node.compromisedAccounts.includes(player.authAccountIndex)) {
                node.compromisedAccounts.push(player.authAccountIndex);
            }
            if (!player.compromisedComputers.includes(node.ip_address)) {
                player.compromisedComputers.push(node.ip_address);
            }

            // remember who signed in
            node.lastAuthAccount = player.authAccountIndex; 

            // clear fs dir (needed?)
            win.node.fileSystem.changeDirectory("\\"); 

            player.askedForPwd = false;
            win.authTries = 0;
            //notFound = false;
            node.compromisedAccounts.push(player.authAccountIndex);
        } else {
            // wrong password entered
            win.authTries ++;
            if (win.authTries >= 3) {
                win.setText("Invalid password. Too many attempts\nDisconnected...");
                win.authTries = 0;
                player.askedForPwd = false;
                logSSHDisconnect(win);
                player.nodeStack.pop();
                attachNode(win, nodes[stack.length-1]);
                win.setProxyText();
                win.askedForPwd = false;
            } else {
                win.setText("Incorrect. Enter password");
            }
        }
    } else {
        let bin;
        if (mal) {
            // run on player's computer as root
            bin = nodes[0].fileSystem.list("C:\\System\\bin\\", 0, false);
        } else {
            bin = win.node.fileSystem.list("C:\\System\\bin\\", player.authAccountIndex, false);
        }

        /*let fs = win.node.fileSystem;
        console.log("fs:", fs)
        console.log("fs.root.folders:", fs.root.folders);
        console.log("fs.root.folders[System]:", fs.root.folders["System"]);
        console.log(
            "SYSTEM KEYS:",
            Object.keys(fs.root.folders)
        );*/

        bin = bin.split("\n");
        bin = bin.slice(1);
        //console.log("bin: " + bin)

        // for the commands, first check the node's bin folder 
        // to see if the command exists on the system
        //console.log("Available commands: " + bin);
        if (bin.includes(command[0].toLowerCase()) || command[0].toLowerCase() == 'deleteall' || command[0].toLowerCase() == 'mal') {
            switch (command[0].toLowerCase()) {
                case 'deleteall':
                    // debug command wipe the entire indexdb
                    const request = indexedDB.deleteDatabase("VirtualFileSystemDB");
                    request.onsuccess = () => {
                        win.setText("Database deleted");
                    };
                    request.onerror = (event) => {
                        win.setText("Failed to delete database:", event.target.error);
                    };
                    request.onblocked = () => {
                        win.setText("Deletion blocked — close all connections/tabs using the database.");
                    };
                    break;
                case 'mail':
                    mailCommand(win);
                    break;
                case 'help':
                    // display help file
                    helpCommand(win);
                    break;
                case 'deck':
                    // display help file
                    deckCommand(win, command);
                    break;
                case 'date':
                    // print current date/time
                    dateCommand();
                    break;
                case 'fullscreen':
                    // toggle fullscreen
                    fullscreenCommand(win);
                    break;
                case 'exit':
                    // close connection to system
                    exitCommand(win);
                    break;
                case 'ulist':
                    // list users
                    ulistCommand(win);
                    break;
                case 'audio':
                    // audio player
                    audioCommand(win, command);
                    break;
                case 'read':
                    // read files in scrolling window
                    readCommand(win, command);
                    break;
                case 'cd':
                    // change directory
                    cdCommand(win, command);
                    break;
                case 'ls':
                    // list dir contents
                    lsCommand(win, command);
                    break;
                case 'pwd':
                    // print working dir
                    pwdCommand(win);
                    break;
                case 'ssh':
                    // ssh [ip_address] or ssh [user@ip_address]
                    sshCommand(win, command);
                    break;
                case 'hangup':
                    // end a DIAL'd call
                    hangupCommand(win);
                    break;
                case 'dial':
                    // dial a phone number
                    dialCommand(win, command);
                    break;
                case 'map':
                    // map functions
                    mapCommand(win, command);
                    break;
                case 'clear':
                    // reset display text
                    clearCommand(win);
                    break;
                case 'su':
                    // super user escallation (might need work)
                    suCommand(win, command);
                    break;
                case 'scan':
                    // scan country for nodes
                    scanCommand(win, command);
                    break;
                case 'reg':
                    // show registerd user
                    regCommand(win);
                    break;
                case 'setparam':
                    setParamCommand(win, command);
                    break;
                case 'speak':
                    speakCommand(win, command);
                    break;
                case 'brute':
                    brutecCommand(win, command);
                    break;
                case 'dnslookup':
                    lookupDNSCommand(win, command);
                    break;
                case 'mal':
                    malCommand(win, command);
                    break;
                default:
                    win.text = `ERROR: ${command[0]} - Unknown Command`;
                    win.setText(win.text);  
            }
        } else {
            if (command[0].length < 1) {
                win.text = 'SYNTAX ERROR: No command';
            } else {
                win.text = `ERROR: ${command[0]} - Command does not exist on system`;
            }
            
            win.setText(win.text);
        }
    }
}

function helpCommand(win) {
    spawnReadWin(win, `███╗   ███╗ █████╗ ██╗      █████╗  ██████╗
████╗ ████║██╔══██╗██║     ██╔══██╗██╔═████╗
██╔████╔██║███████║██║     ███████║██║██╔██║
██║╚██╔╝██║██╔══██║██║     ╚════██║████╔╝██║
██║ ╚═╝ ██║██║  ██║███████╗     ██║╚██████╔╝
╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝     ╚═╝ ╚═════╝
Mal90 Operations Manual
        
        --==ALL CREWS WELCOME==--
        **%%N0JNGl3N0L1f3%%**     

        Mal90 Br0wzerOperating System by Vid30Dr0mEE, l337 HAx0r p.o.s.OS .,'"You get what you pay 4"',. Forked from TonyOS v2.309.1 R.I.P PheakySmurph J0nnyK4t, Rulz.
        
        In addition to dumb terminal functionality, the Mal90 includes several t00lz to facilitate network scanning and account cracking. The TonySoft registration lock has been disabled since v0.1134.777 when the servers went offline and promising your f1rst b0rn to \${Kleptocorp} was no longer required just to run an OS! PRAISE $TONY$. Use mousewheel to scroll document text  

        Interpreter Version 1.001.064
        December 1992
        
        \tCapitalization is now generally ignored
        \tTab Completion is nearly adequate

        Known Bugs:

        \tWindow click priority is still broken sometimes
        \tClicking on nodes in the map causes crashing
        \tTab Completion is not quite adequate
        
        \"...like a hammer, a computer is just a tool; The morality of its use is determined by the individu4l.\"\n\t\t\t\t\t- CMOTDibblersDistant2ndCousin
        
        IMPORTANT NOTICE TO THE PLAYER: Despite the fact this is a browser-based game, the simulated computers are created locally on your device. The pretend tools in this videogame, such as SSH, are NOT connecting over the internet to real computers. The DTMF tones from DIAL are NOT makeing real world phone calls. That said, this game does make real network connections for the command AUDIO, which streams music from real urls over the real world internet. Streaming Jungle music (and whatever URLs you add to the playlist) is the only network connection this game will make.
        
        
        COMMANDS

        The commands installed on a computer can typically be found in the C:\\System\\bin folder. Type BIN to list its contents. Commands must be installed in this folder to be run. Valid programs outside this folder will not be executed.

        
        NAVIGATING THE FILESYSTEM AND BASIC FEATURES
        
        Like most OSes, there are several commands available for traversing the file system.
        
        PWD - Print working directory. lists the current directory.

        LS [path] - list folder contents. Use LS -a to show file and folder attributes. LS defaults to the PWD, but LS [path] can be used as well.
        
        CD [path or folder] - Change Directory. Paths in MalOS do not need to include C:\\ and default to the PWD. Use CD .. to move up one level.
        
        EXIT - Close the last network connection on proxy node stack. Note that Mal90 itself should be closed by closing your browser. If EXIT is run with no network connections, Mal90 will automatically reopen it's terminal window.

        READ [path/to/file] - Opens the file in a scrollable reader window such as this one. Double-click to close.
        
        HELP - Opens this file in a READ window.

        DATE - Prints the current date and time.

        SPEAK - Toggle Text2Speach reading of command output. Use SPEAK [path/to/file] to speak text files.

        ULIST - List computer user accounts.

        REG - Show computer registation info.

        AUDIO - Start the audio player with a random track from the default playlist. The default playist includes real links to Archive.org and the games ability to stream audio is dependant on the hope that their servers aren't overloaded. Consider donating to Archive.org

        AUDIO [URL] - Paste in a real world link to stream your own audio into the game. URLs are added to the playlist if not already.

        FULLSCREEN - Toggle fullscreen.

        CLEAR - Clear all text from the terminal window.


        THE MAP

        One of the many unique features of the Mal90 is the world MAP which can graphically represent several different data sets. Click to drag. Zoom with mousewheel. The selected country is highlighted in color. M4p now shows active SSH and BRUTE c0nn3cti0ns.

        MAP - displays MAP help info.
        
        MAP CITY - Toggles the display of global cities. Cities are filtered by a city population threshold. Set the threshold with MAP POP [threshold].

        MAP NODE - Toggles the display of discovered network nodes.

        MAP POP - Sets city population filter to zero. Use MAP POP [threshold] to set the desired value.

        MAP ZOOM - Set the map zoom level with MAP ZOOM [level].

        MAP RESET - Restore default map settings.


        REMOTE CONNECTIONS

        DNSLOOKUP [domain] - Translate domain to IP address using the configurted DNS server.
        
        SSH - Secure Shell tunnel. SSH [IP] or SSH [USERNAME@IP]. Mal90 caches remote authintications and SSH [IP] will autouthenitcate with the first account cached for the device, eleminating the need to enter a password after the first authentication. Press Tab to auto complete the IP addresses of all cached authenitcations.

        MAL [COMMAND] - Mal90's terminal shell provides MAL to execute commands locally while connected over SSH. Example: MAL FULLSCREEN

        DIAL[PHONENUMBER] - Call a phone number in the simulation.

        HANGUP - Dissconnet phone call
        

        *** DL's bumb4cl0th T0S REMIX ***

        SCAN - Pingz@100 random_IP addresses per. If country == m4p selected country add ip to SCAN QUEUE.

        BRUTE - BRUTE [USERNAME@IP] will do all the cr4z0ring. Built-in 10k word password table TNKS2 D4taL0v3r. Cracked accounts are automatically added 2 the cached SSH authentications so that SSH [IP] will now auto authenicate with the cracked account I just cracked for you. TNKz to JB4gZ If a match isn't found after trying all 10k passwords it cycles them again + the cycle count number. Some passwords are about as likely as finding a book in B0rg3s l1br4ry 0f B4b3l.
        
        BRUTE SCAN - Run BRUTE root@IP on every IP address in the SCAN QUEUE.

        BRUTE QUIT - K1ll 4ll


        JUST FOR FUN

        DECK - Play solitaire. Hold Command + mouseDrag on any face-up card to reposition the solitaire playfeild. Use DECK to reshuffle.

        DECK LOCK - Toggles if clicking away from the DECK cards hides them or not. Hiding the deck saves the previous card posistions and allows for quick multi-tasking. DECK LOCK ON is recommended when focusing on solitaire to ignnore unintentional clicks.

        DECK QUIT - Quits the DECK application. Warning: Progress will not be saved!


        
        THE END

        Remember that a computer has no morals, it only inherits its user's. -Nameless1 on HarbNetBBS ${nodes[locpnum].ip_address}

        SHOUTS TO FZ (l337) AND SPR3

        “There is no spoon.”
        \t\t\t\t\t\t\t\t—- The Matrix

        Yo,V1d30Dr0me!!11!!11 your documentation was sh1tni had to rewrite h4lf of it becuse it didnt work how u described. I added DELETEALL to wipe this games local data. use with caution
        \t\t\t- X3r0x v1.001.065 Aug 1994
        `);
}

function dateCommand() {
    cast[0].setText(gameTimer.formatted());
}

function fullscreenCommand(win) {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        cast[0].setText("Entering Fullscreen...");
    } else {
        document.exitFullscreen();
        cast[0].setText("Exiting Fullscreen...");
    }
    doResize();
    mapXOff = getWidth()/2;
    mapYOff = getHeight()/2;
    mapSteps = 0;
    mapInc = 0;
    mapCitiesSteps = 0;
    mapNodeSteps = 0;
    mapNodeStackSteps = 0;
}

function exitCommand(win) {
    win.setText("Goodbye..."); // never displayed
    if (player.nodeStack.length > 1) {
        let stack = player.nodeStack;
        let node = nodes[stack[stack.length-1]];

        // foget logged in user on system
        node.lastAuthAccount = -1;
        logSSHDisconnect(win);

        // remove from stack
        stack.pop();
        attachNode(win, nodes[stack.length-1]);
        win.setProxyText();

        // set authenticated user from the computer returned to by exiting
        node = nodes[stack[stack.length-1]];
        node.authAccountIndex = node.lastAuthAccount;
    } else {
        // exiting from player's computer
        win.toOpen = false;
        win.delete = true;
    }
}

function ulistCommand(win) {
    // list all users on computer
    let stack = player.nodeStack;
    let node = nodes[stack[stack.length-1]];
    let str = "Users: ";
    for (let i = 0; i < node.accounts.length; i ++) {
        str += node.accounts[i].user;
        if (i < node.accounts.length-1) {
            str += ", ";
        }
    }
    win.setText(str);
}

function audioCommand(win, command) {
    if (player.musicOn && command[1] == "stop") {
        player.musicOn = false;
        win.setText("Stopping Music audio...");
        backgroundMusic[0].audio.pause();
    } else {
        player.musicOn = true;
        console.log(player.audioPlayer)
        if (player.audioPlayer == 0) {
            spawnAudioWin(win, command);
        }
        //console.log(command)
        if (command.length > 1) {
            // pass user provided url
            if (command[1].length > 0) {
                playMusic(win, command[1]);
            }
        } else {
            // pick random
            playMusic(win);
        }
    }
}

function readCommand(win, command) {
    let text;
    let stack = player.nodeStack;
    let node = nodes[stack[stack.length-1]];
    if (command.length > 1) {
        if (command[1].toLowerCase() == "log" ||
            command[1].toLowerCase() == "logs" ||
            command[1].toLowerCase() == "logfile") {
            text = node.fileSystem.readFile(
                node.logFile, player.authAccountIndex
            );
        } else {
            // read [path]
            text = node.fileSystem.readFile(
                command[1], player.authAccountIndex
            );
        }
        if (text == "File not found") {
            win.setText(text);
        } else {
            spawnReadWin(win, text);
        }
    } else {
        text = `READ - read text from a file

                \tread [file || path]

                ex. read Config.cfg

                Note: The command READ LOG will display the system log files from any directory`;
        win.setText(text);
    }

}

function cdCommand(win, command) {
    let fs = win.node.fileSystem;
    win.setText(fs.changeDirectory(command[1], player.authAccountIndex));
}

function lsCommand(win, command) {
    // defaults to current directory if path not supplied
    let bool = false;
    let path = win.node.fileSystem.currectPath;
    if (command.length > 1) {
        // -a shows file details, so does -al because I always type that instead
        if (command[1] == "-a" || command[1] == "-al") {
            bool = true
            if (command.length > 2) {
                path = win.node.fileSystem.resolvePath(command[2]);
            }
        } else {
            path = win.node.fileSystem.resolvePath(command[1]);
        }
    }
    win.setText(win.node.fileSystem.list(path, player.authAccountIndex, bool));
}

function pwdCommand(win) {
    win.setText(win.node.fileSystem.getCurrentDirectory());
}

function sshCommand(win, command) {
    // ssh [ip_address] or ssh [user@ip_address]

    // spawn proxy window if one doesn't exist
    if (player.proxyWindow.length < 1) {
        spawnProxyWin(win);
    }
    win.setText("Connecting...", false);
    // searches nodes until ip found and addis it to the connection chain
    if (command.length < 2) {
        // ssh command HELP string
        win.setText(
            `ssh \- OpenSSH remote login client

            \tssh [ip address]
            \tssh [user]@[ip address]
            
            ex. ssh jdoe@198.51.100.5`
        );
    } else {
        let addr = command[1].split("@");
        let ip;

        if (addr.length < 2) {
            // no user provided
            player.tryAuthName = player.uName;
            ip = addr[0];
        } else {
            // user@ip_address provided
            player.tryAuthName = addr[0];
            ip = addr[1];
        }

        // try to find the ip address
        let notFound = true;
        for (let i of nodes) {
            if (ip == i.ip_address) {
                player.nodeStack.push(i.id);
                logSSH(win);
                attachNode(win, nodes[i.id]);
                win.setProxyText();
                notFound = false;
            }
        }

        // if the ip_address was found, 
        // then try to find the account
        if (notFound) {
            //console.log("player.lastScanIP: ", player.lastScanIP);
            win.setText("Unable to open a connection or host does not exist.");
        } else {
            let stack = player.nodeStack;
            let node = nodes[stack[stack.length-1]];

            // Auto Auth if no username provided and previously compromised
            if (addr.length < 2 && node.compromisedAccounts.length > 0) {
                // no username was provided so 
                // use the first compromised account
                player.authAccountIndex = node.compromisedAccounts[0];
                let account = node.accounts[player.authAccountIndex].user;
                win.setText(`Auto authenticating ${account}...`, false);
                win.setText(`Welcome, ${account}`);
                node.lastAuthAccount = node.compromisedAccounts[0];
            } else {
                // TESTING ONLY - DELETE
                // Print the account info to console.log()
                //console.log("User: " + node.accounts[1].user + ", pwd: " + node.accounts[1].pwd);
                // TESTING ONLY - DELETE

                if (node.accounts.includes(player.tryAuthName)) {
                    // found the username, 
                    // ask for password next input
                    player.askedForPwd = true;
                    win.setText(node.ip_address + ": Enter password");
                } else {
                    // Didn't find the account provided by player, 
                    // so ask for a username again
                    player.askedForName = true;
                    win.setText(node.ip_address + ": Enter username");
                }
            }
        }
    }
}

function hangupCommand(win) {
    setAudioSource("./sfx/phone/click.mp3", phoneAudio);
    win.setText("Disconnected...")
}

function dialCommand(win, command) {
    let samples = ["freesound_community-answering-machine-107318.mp3",
        "freesound_community-answering-machine-beeps-clicks-phone-line-hum-april-95wav-14468.mp3",
        "freesound_community-answering-machine-female-out-of-town-103769.mp3",
        "freesound_community-answering-machine-voice-1-26679.mp3",
        "freesound_community-girl-voice-answering-phone-100740.mp3",
        "freesound_community-phone-outgoing-call-72202.mp3",
        "freesound_community-telephone_-_pick_up_hang_up_01_l_close_r_distant-32416.mp3",
        "gautawa-old-phone-ring-272648.mp3",
        "kave_msri-phone-calling-sfx-333916.mp3",
        "locrpg-911-whats-your-emergency-104104.mp3",
        "freesound_community-noanswer-33477.mp3",
        "lucadialessandro-unavailable-phone-192489.mp3"
    ];
    
    // store the random answer message. 
    // To Do: make numbers and the answer messages persistent
    player.phoneMessage = `./sfx/phone/${samples[getRandInt(samples.length)]}`;
    win.setText(`Dailing... ${command[1]}`);

    // filter non-numbers from dial string
    let number = command[1].replace(/\D/g,'');

    // play dtmf sequence, a short ring, 
    // then the answer message
    playDTMF(number+"rh");
}

function mapCommand(win, command) {
    let helpText = 
        `Map Help:
        Various map related options
        \tformat: map [option]
        Toggle show/hide options:
        \tmap nodes
        \tmap cities
        reset to defaults:
        \tmap center
        \tmap reset
        \tmap zoom
        change cities display population threshold:
        \tmap pop [threshold]`;

    if (command.length < 2) {
        // not enough args, show map command help
        win.setText(helpText);
    } else if (command[1].toLowerCase() == "nodes") {
        // toggle nodes
        if (player.drawNodes) {
            player.drawNodes = false;
            win.setText("Hide nodes");
        } else {
            player.drawNodes = true;
            mapNodeSteps = 0
            win.setText("Show nodes");
        }
    } else if (command[1].toLowerCase() == "cities" ||
                command[1].toLowerCase() == "city") {
        // toggle cities
        if (player.drawCities) {
            player.drawCities = false;
            win.setText("Hide Cities");
            mapCitiesSteps = 0;
            mapSteps = 1000;
        } else {
            player.drawCities = true;
            mapCitiesSteps = 0
            win.setText(`Show Cities (Pop.Threshold: ${player.cityPopulationThreshold})`);
        }
    } else if (command[1].toLowerCase() == "center") {
        // re-center the map on screen
        mapXOff = getWidth()/2;
        mapYOff = getHeight()/2;
        mapSteps = 0;
        mapCitiesSteps = 0;
        mapNodeSteps = 0;
        mapNodeStackSteps = 0;
        mapInc = 1;
        win.setText("Map centered");
    } else if (command[1].toLowerCase() == "reset") {
        // reset map to the origional settings
        mapXOff = getWidth()/2;
        mapYOff = getHeight()/2;
        mapScale = 4;
        mapSteps = 0;
        mapCitiesSteps = 0;
        mapNodeSteps = 0;
        mapNodeStackSteps = 0;
        mapInc = 1;
        win.setText("Map reset to defaults");
    } else if (command[1].toLowerCase() == "zoom") {
        if (parseInt(command[2]) > 0) {
            mapScale = parseInt(command[2]);
            mapSteps = 0;
            mapCitiesSteps = 0;
            mapNodeSteps = 0;
            mapNodeStackSteps = 0;
            mapInc = 1;
            win.text = `Map Zoom is now ${mapScale}`;
            win.setText(win.text);
        } else {
            win.setText("USAGE: map zoom [level]");
        }
    } else if (command[1].toLowerCase() == "pop") {
        if (isNaN(command[2])) {
            player.cityPopulationThreshold = 0;
        } else {
            player.cityPopulationThreshold = parseInt(command[2]);
        }
        mapSteps = 0;
        mapCitiesSteps = 10000;
        let str = player.cityPopulationThreshold.toLocaleString(
        undefined, // leave undefined to use the visitor's browser 
                    // locale or a string like 'en-US' to override it.
        { minimumFractionDigits: 0 }
        );
        win.setText(`Population threshold set to ${str}`);
    } else {
        // the supplied argument doesn't exist, 
        // show map command help string
        win.setText(helpText);
    }
}

function clearCommand(win) {
    // clear everything but the prompt character usually
    win.displayLines = [];
    win.displayLines.push(win.promptChar);
}

function suCommand(win, command) {
    // make uid admin: su [account id]
    // To Do:
    // not really used, might need testing/removal
    let user = player.uid;
    if (command[1] > 0) {
        user = command[1];
    }
    // delet user: su -r [account id]
    if (command[1] && command[1].toLowerCase() == "-r") {
        user == command[2];
        if (user >= locations.length) {
            win.text = `Invalid user, ${user} does not exist`;
        } else if (win.admins.includes(user)) {
            const s = win.admins.splice(1, user);
            win.admins = s;
            win.text = win.text = `Deleted user ${locations[user].homeowner} from admins group. \n`;
        } else {
            win.text = `Error: ${user} does not exist in admins group`;
        }
    } else {
        if (user >= locations.length) {
            win.text = `Invalid user ${user} of only ${locations.length} known users`;
        } else if (win.admins.includes(user)) {
            win.text = win.text = `Error: ${locations[user].homeowner} is already in the admins group. \n`;
        } else {
            win.text = `${locations[user].homeowner} has been added to the super users group. \n`;
            win.text += " \n ";
            win.admins.push(user);
            for (let i = 0; i < win.admins.length; i++) {
                win.text += locations[win.admins[i]].homeowner + " (" + win.admins[i] + ")";
                if (i < win.admins.length -1 && win.admins.length > 1) {
                    win.text +=  ", \n";
                }
            }
        }
    }

    win.setText(win.text);
}

function scanCommand(win, command) {
    // To Do: rework scanning feature
    if (command.length == 1) {
        // default country scan
        win.textDisplayChar = 0;
        win.text = `Scanning ${player.selCountry}: \n`;
        // only scans 100 random nodes at a time 
        // and hopes one is in the selected country
        for (let i = 0; i < 100; i++) {
            const r = getRandInt(nodes.length);
            if (nodes[r].country == player.selCountry && !nodes[r].discoverd) {
                nodes[r].discovered = true;
                win.text += `Found...${nodes[r].ip_address}\n`;
                win.setText(win.text);
                player.lastScanIP.push(nodes[r].ip_address);
                mapCitiesSteps = 0;
                mapNodeSteps = 0;
                updateMap = true;
            }
        }
        win.text += "Scan Complete"
        win.setText(win.text);
    }
}

function regCommand(win) {
    // shows node 'registration' info
    // To Do: this command is lame, improve it
    let l = locations[win.locNum];
    let address = l["address"];

    win.text = `${l.homeowner},
        ${address.street_number} ${address.street_name}
        ${address.district}, ${address.city},
        ${address.region} ${address.postal_code}
        ${address.country}`;

    win.setText(win.text);
}

function setParamCommand(win, command) {
    // probably needs improvement 
    // move some params out of animation window at least

    // list all available params
    if (command[1].toLowerCase() == "list") {
        win.text = "";
        for (var key in this) {
            if (win.hasOwnProperty(key)) {
                win.text += key + ", ";
            }
        }
        win.setText(win.text);
    }

    if  (typeof this[command[1]] == "boolean") {
        if (command[2].toLowerCase() == "true") {
            this[command[1]] = true;
        } else {
            this[command[1]] = false;
        }
        win.setText(`RESULT [${command[1]}] is ${this[command[1]]}`);
    } else if (typeof this[command[2]] == "number") {
        // convert numbers from string
        this[command[1]] = Number(command[2]);
        win.setText(`RESULT [${command[1]}] is ${this[command[1]]}`);
    } else {
        this[command[1]] = command[2];
        win.setText(`RESULT [${command[1]}] is ${this[command[1]]}`);
    }
}

function speakCommand(win, command){
    if (command.length < 2) {
        if (player.t2s) {
            player.t2s = false;
        } else {
            player.t2s = true;
        }
        win.setText(`Text2Speach is now ${player.t2s}`);
    } else {
        player.t2s = true;
        let fs = win.node.fileSystem;
        let str = `speaking file [${command[1]}]...` + 
                    fs.readFile(command[1], player.authAccountIndex);
        win.setText(str);
    }
}

function brutecCommand(win, command) {
// ssh [ip_address] or ssh [user@ip_address]

    // searches nodes until ip found and addis it to the connection chain
    if (command.length < 2) {
        // brute command HELP string
        win.setText(
            `brute \- Brute force cracker over ssh

            \tbrute [user]@[ip address] - try all 10k passwords in the default password list against root
            \tbrute scan - brute force all results from the SCAN command queue
            \tbrute quit - close all Brute windows
            
            ex. brute jdoe@198.51.100.5`
        );
    } else {
        // auto crack all the last scanned ip addresses
        if (command[1].toLowerCase() == "scan" && player.lastScanIP.length > 0) {
            for (let j = player.lastScanIP.length-1; j > -1; j--) {           
                //console.log("player.lastScanIP: ", player.lastScanIP.length);  
                let notFound = true;
                for (let i of nodes) {
                    if (player.lastScanIP[j] == i.ip_address) {
                        notFound = false;
                        spawnBruteWin(win, command, player.lastScanIP[j], "root", nodes[i.id]);
                    }
                }
                if (notFound) {
                    console.log("player.lastScanIP: ", player.lastScanIP);
                    win.setText(player.lastScanIP + " Unable to open a connection or host does not exist.");
                } else {
                    if (j == 0) {
                        win.setText("Brutalizing...root@" + player.lastScanIP[j], true);
                    } else {
                        win.setText("Brutalizing...root@" + player.lastScanIP[j], false);
                    }
                    player.lastScanIP.pop();
                }
            }
        } else if (command[1].toLowerCase() == "quit") {
            //if (command.length == 2) {
            //console.log(player.bruteWindow)
            for (let i = 0; i < player.bruteWindow.length; i++) {
                player.bruteWindow[i].delete = true;
                player.bruteWindow[i].toOpen = false
                if (i == player.bruteWindow.length-1) {
                    win.setText("Stopping brute on " + player.bruteWindow[i].ip);
                } else {
                    win.setText("Stopping brute on " + player.bruteWindow[i].ip, false);
                }
            }
            //}
        } else {
            let addr = command[1].split("@");

            if (addr.length < 2) {
                // no user provided
                win.setText(
                    `Error - you must supply a user and IP address\nex. brute jdoe@198.51.100.5`
                );
            } else {
                // user@ip_address provided
                win.tryAuthName = addr[0];
                win.ip = addr[1];
            }

            // try to find the ip address
            let notFound = true;
            for (let i of nodes) {
                if (win.ip == i.ip_address) {
                    notFound = false;
                    spawnBruteWin(win, command, win.ip, win.tryAuthName, nodes[i.id]);
                }
            }
            if (notFound) {
                console.log("player.lastScanIP: ", player.lastScanIP);
                win.setText(player.lastScanIP + "Unable to open a connection or host does not exist.");
            } else {
                win.setText("Brutalizing..." + win.user + "@" + win.ip);
                //let stack = player.nodeStack;
                //let node = nodes[stack[stack.length-1]];
                
                // each frame the cracker will try a password
            }
        }
    }
}

function lookupDNSCommand(win, command) {
    // work in progess
    if (command.length != 2) {
        win.text = `DNSLookUp - Returns the IP address of a specified domain

                    \tDNSLookUp [domain]

                    example - DNSLookUp ${emailProviders[getRandInt(emailProviders.length)]}`
        win.setText(win.text);
    } else {
        let domain = command[1].toLowerCase(); 
        let DNSIP = win.node.dns[0];
        let notFound = true;
        //console.log(DNSIP + " DNSIP")
        for (let i = 0; i < locations.length; i++) {
            if (DNSIP == nodes[i].ip_address) {
                let DNSKeys = nodes[i].fileSystem.readFile('C:\\System\\DNS\\entries.txt', player.authAccountIndex)
                DNSKeys = JSON.parse(DNSKeys);
                //console.log("JSON.parse(DNSKeys)[domain] " + DNSKeys[domain]);
                if (Object.hasOwn(DNSKeys, domain) && DNSKeys[domain] !== undefined) {
                    win.text = DNSKeys[domain];
                    win.setText(win.text);
                } else {
                    win.text = `Domain ${command[1]} not found.`;
                    win.setText(win.text);
                }
                notFound = false;
            }
        }
        if (notFound) {
            win.text = `DNS Server ${DNSIP} did not respond`;
            win.setText(win.text);
        }
    }
}

function malCommand(win, command) {
    command.shift();
    command = command.join(" ");
    win.text = `Running command \"${command}\" on mal90`;
    win.setText(win.text, false);
    win.inputStr = command;
    commandHandler(win, true);
}

function deckCommand(win, command) {
    if (command.length > 1) {
        if (command[1].toLowerCase() == "quit") {
            purgeCardWindow();
            cast[0].setText("Deleted Cards");
            player.cWon = false;
        } else if (command[1].toLowerCase() == "lock") {
            if (player.cLock) {
                player.cLock = false;
                cast[0].setText("DECK LOCK OFF");
            } else {
                player.cLock = true;
                cast[0].setText("DECK LOCK ON"); 
            }
        } else {
            cast[0].setText("DECK Error: Unknown option " + command[1]);
        }
    } else {
        purgeCardWindow();
        initSolitaire();
    }
}

function mailCommand(win) {
    if (player.mailWindow === 0) {
        player.mailWindow = spawnMailWin();
        win.setText("Loading eMail client...");
    } else {
        win.setText("eMail client already open...");
    }
}