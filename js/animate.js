class aniRect {
    constructor(x, y, width, height) {
        this.node = [];
        //this.glowEffect = true;
        //this.glowEffectWidth = 10;
        this.alpha = 0.75;
        this.isRounded = true;
        this.cornerRad = 20;
        this.rectLineWidth = 1;
        this.hasBoarder = true;
        this.boarderWidth = width/40;
        this.boarderHeight = height/40;
        this.boarderLineWidth = 5;
        this.toOpen = true;
        this.delete = false;
        this.aniSpeed = 30.1;
        this.ease = 0.075;
        this.mouseDrag = false;
        this.x1 = x; // start
        this.y1 = y;
        this.xP = 0; // progress
        this.yP = 0;
        this.xW = width; // max
        this.yH = height;
        this.rectColor = '#28d406';
        this.textColor = '#28d406';
        this.fontSize = 18;
        this.textFont = "Courier New"; // "Hyperspace";
        this.opaqueBackground = true;
        this.backgroundColor = '#060606';
        this.textLines = []
        this.textMaxLines = 0;
        this.admins = [];
        this.approvedComands = ["reg"];
        this.displayLines = [];
        this.textDisplayChar = 0;
        this.typingEffect = true;
        this.date = "07/18/2026:19:37"
        this.locNum = cast.length;
        this.inputStr = "";
        this.acceptInput = true;
        this.lastInput = "";
        this.proxyWindow = [];
        this.type = "none";
        this.wheelOff = 0; // scroll wheel offset
        this.text = "";
        this.authTries = 0;
        this.pri = cast.length; // draw priority
        this.resizing = false;
        // map defaults
        this.drawMap = true
        this.mapHasBoarder = true;
        this.mapLineWidth = 1;
        this.mapBoarderLineWidth = 2;
        this.mapBoarderColor = '#00ba00';
        this.mapdefaultColor = '#FFFFFF';
        this.mapSelCountryColor = '#a06000'
        // proxy defaults
        this.proxyFontSize = 12;
        this.proxyText = "Proxy List:\n"
        this.proxyBackgroundColor = '#3d0240'
        this.proxyRectColor = '#ec32f6'
        this.proxyTextColor = '#db96de'
        this.proxyIsRounded = false;
        this.proxyHasBoarder = false;
        this.pX1 = getWidth()/25 * 10.2;
        this.pY1 = getHeight()/8;
        this.pXW = getWidth()/6;
        this.pYH = getHeight()/1.5;
        // reader defaults
        this.readerFontSize = 16;
        this.readerText = "Proxy List:\n"
        this.readerBackgroundColor = '#141414'
        this.readerRectColor = '#f59b13'
        this.readerTextColor = '#d68306'
        this.readerIsRounded = false;
        this.readerHasBoarder = true;
        this.rX1 = getWidth()/25 * 10.5;
        this.rY1 = getHeight()/8;
        this.rXW = getWidth()/2.5;
        this.rYH = getHeight()/1.5;
        // audio player defaults
        this.audioFontSize = 12;
        this.audioText = ""
        this.audioBackgroundColor = '#390ed2'
        this.audioRectColor = '#3952f7'
        this.audioTextColor = '#f7faf8'
        this.audioIsRounded = true;
        this.audioHasBoarder = false;
        this.aX1 = getWidth()/25 * 11;
        this.aY1 = getHeight()/8;
        this.aXW = getWidth()/5;
        this.aYH = getHeight()/5;
        this.songScrollOffset = 0;
        this.songScrollSpeed = 1;
    }

    setText(theText, prompt = true) {

        if (player.t2s) {
            speak(theText);
        }
        
        // Set font and text color
        ctx.fillStyle = this.textColor;
        ctx.font = this.fontSize + "px " + this.textFont;

        // set max lines
        let o = 0;
        // mail has a lowered scroll area
        if (this.type == "mail") {
            o = this.xW/10 * 2.6;
        }
        this.textMaxLines = Math.floor((this.yH - o) / (this.fontSize * 1.25));

        // wrap text
        let wrapped = this.textWrapLines(ctx, theText, this.xW - this.fontSize, 0);
        for (const line of wrapped) {
            this.displayLines.push(line);
        }
        
        // add the input prompt
        if (prompt) {
            this.displayLines.push(this.promptChar);
        }
        if (this.type == "none") {
            // force the mal90 scroll to bottom
            this.wheelOff += 10000
        }
    }

    clickHandler(e) {
        if (e.detail > 1) {

            // solitaire 
            if (this.type == "card") {
                handleCardClick(this);
            } else {
                this.toOpen = false;
                this.delete = true;
            }
        }
    }

    authKeyHandler(e) {
        e.preventDefault();
        if (e.key == "Enter") {
            // execute entered string
            if (this.focusNum == 2) {
                this.authMode = false;
            } else {
                this.focusNum ++;
            }
        } else if (e.key == "Tab") {
            if (this.focusNum == 2) {
                this.focusNum = 0;
            } else {
                this.focusNum ++;
            }
        } else if (e.key == "Backspace") {
            switch (this.focusNum) {
                case 0:
                    if (this.host.length > 0) {
                        this.host = this.host.substring(0, this.host.length-1);
                    }
                    break;
                case 1:
                    if (this.user.length > 0) {
                        this.user = this.user.substring(0, this.user.length-1);
                    }
                    break;
                case 2:
                    if (this.password.length > 0) {
                        this.password = this.password.substring(0, this.password.length-1);
                    }
                    break;
                default:
            }
        } else if (
            e.key != "Control" &&
            e.key != "Meta" &&
            e.key != "Shift" &&
            e.key != "Alt" &&
            e.key != "CapsLock" &&
            e.key != "ArrowLeft" &&
            e.key != "ArrowRight"
        ) {
            switch (this.focusNum) {
                case 0:
                    this.host += e.key;
                    break;
                case 1:
                    this.user += e.key;
                    break;
                case 2:
                    this.password += e.key;
                    break;
                default:
            }
            
        }

    }

    keyHandler(e) {
        if (e.key == "Enter") {
            // execute entered string
            this.lastInput = this.inputStr;
            //console.log("Enter: " + this.inputStr);
            commandHandler(this);

        } else if (e.key == "Tab") {
                e.preventDefault();

                let node = cast[0].node;
                let command = this.inputStr.split(" ");

                // ---------------------------------------------------------
                // Command completion
                // ---------------------------------------------------------
                if (command[0] == "brute") {
                    // tab complete Scan, Stop and compromised ips
                    let choices = [];
                    if ("quit".startsWith(command[1].toLowerCase()) || command.length == 1) {
                        choices.push("quit");
                    }
                    if ("scan".startsWith(command[1].toLowerCase()) || command.length == 1) {
                        choices.push("scan");
                    }
                    for (let i of player.lastScanIP) {
                        if (i.startsWith(command[1])) {
                            choices.push(i);
                        }
                    }
                    if (choices.length > 1) {
                        let str = "";
                        for (let c = 0; c < choices.length; c++) {
                            if (c == choices.length -1) {
                                str += choices[c];
                            } else {
                                str += choices[c] + "\n";
                            }
                        }
                        this.setText(str);
                        if (command[1] === undefined) {
                            this.inputStr = command[0];
                        } else {
                            this.inputStr = command[0] + " " + command[1];
                        }
                        this.displayLines[this.displayLines.length - 1] =
                        node.promptChar + this.inputStr;
                    } else if (choices.length == 0) {
                        // do nothing
                    } else {
                        this.inputStr = command[0] + " " + choices[0];
                        this.displayLines[this.displayLines.length - 1] =
                        node.promptChar + this.inputStr;
                    }
                    
                    return;
                }
                if (command[0] == "dnslookup") {
                    // tab complete eMailProviders for now
                    let choices = [];
                    for (let i of emailProviders) {
                        if (i.toLocaleLowerCase().startsWith(command[1].toLocaleLowerCase())) {
                            choices.push(i);
                        }
                    }
                    if (choices.length > 1) {
                        let str = "";
                        for (let c = 0; c < choices.length; c++) {
                            if (c == choices.length -1) {
                                str += choices[c];
                            } else {
                                str += choices[c] + "\n";
                            }
                        }
                        this.setText(str);
                        if (command[1] === undefined) {
                            this.inputStr = command[0];
                        } else {
                            this.inputStr = command[0] + " " + command[1];
                        }
                        this.displayLines[this.displayLines.length - 1] =
                        node.promptChar + this.inputStr;
                    } else if (choices.length == 0) {
                        // do nothing
                    } else {
                        this.inputStr = command[0] + " " + choices[0];
                        this.displayLines[this.displayLines.length - 1] =
                        node.promptChar + this.inputStr;
                    }
                    
                    return;
                }
                if (command[0] == "ssh") {
                    // tab complete for compromisedComputers ip
                    let choices = [];
                    if (command.length > 1) {
                        // split off user
                        let param = command[1].split("@");
                        let ip;
                        if (param.length > 1) {
                            ip = param[1];
                        } else {
                            ip = param[0]
                        }
                        for (let i of player.compromisedComputers) {
                            //console.log(`ip ${ip}, i ${i}`)
                            if (i.startsWith(ip)) {
                                choices.push(i);
                            }
                        }
                    } else {
                        for (let i of player.compromisedComputers) {
                            choices.push(i);
                        }
                        console.log(choices);
                    }
                    
                    if (choices.length > 1) {
                        let str = "";
                        for (let c = 0; c < choices.length; c++) {
                            if (c == choices.length -1) {
                                str += choices[c];
                            } else {
                                str += choices[c] + "\n";
                            }
                        }
                        this.setText(str);
                        if (command[1] === undefined) {
                            this.inputStr = command[0];
                        } else {
                            this.inputStr = command[0] + " " + command[1];
                        }
                        this.displayLines[this.displayLines.length - 1] =
                        node.promptChar + this.inputStr;
                    } else if (choices.length == 0) {
                        // do nothing
                    } else {
                        if (command[1] && command[1].split("@").length > 1) {
                            this.inputStr = command[0] + " " + 
                                command[1].split("@")[0] + "@" + choices[0];
                        } else {
                            this.inputStr = command[0] + " " + choices[0];
                        }
                        this.displayLines[this.displayLines.length - 1] =
                        node.promptChar + this.inputStr;
                    }
                    
                    return;
                }
                // If there is no space, we're completing a command.
                if (!this.inputStr.includes(" ")) {
                    let commandPrefix = this.inputStr;

                    let val = node.fileSystem.tabComplete(
                        "C:\\System\\bin\\" + commandPrefix,
                        player.authAccountIndex
                    );

                    // No matches
                    if (val.length === 0) {
                        return;
                    }

                    // Multiple matches
                    if (val.length > 1) {
                        let matches = val.map(x => x.name).join("\n");

                        this.setText(matches);

                        this.displayLines[this.displayLines.length - 1] =
                            node.promptChar + this.inputStr;

                        this.lastInput = this.inputStr;

                        return;
                    }

                    // Exactly one match
                    this.inputStr = val[0].name;

                    this.displayLines[this.displayLines.length - 1] =
                        node.promptChar + this.inputStr;

                    return;
                }
        

                // ---------------------------------------------------------
                // Path argument completion
                // ---------------------------------------------------------

                let lastSpace = this.inputStr.lastIndexOf(" ");

                let prefix = this.inputStr.substring(0, lastSpace + 1);
                let p = this.inputStr.substring(lastSpace + 1);

                let val = node.fileSystem.tabComplete(
                    p,
                    player.authAccountIndex
                );

                // No matches
                if (val.length === 0) {
                    return;
                }

                // Multiple matches
                if (val.length > 1) {
                    let matches = val.map(x => x.name).join("\n");

                    this.setText(matches);

                    this.displayLines[this.displayLines.length - 1] =
                        node.promptChar + this.inputStr;

                    this.lastInput = this.inputStr;

                    return;
                }

                // Exactly one match
                let parts = p.split("\\");
                let filePart = parts.pop();
                let prevPath = parts.join("\\");

                // Preserve leading "\" for absolute paths
                let isAbsolute = p.startsWith("\\");

                if (isAbsolute && prevPath !== "") {
                    prevPath = "\\" + prevPath;
                }

                let completedPath;

                if (prevPath === "") {
                    completedPath = val[0].name;
                } else if (prevPath === "\\") {
                    completedPath = "\\" + val[0].name;
                } else {
                    completedPath = prevPath + "\\" + val[0].name;
                }

                this.inputStr = prefix + completedPath;

                this.displayLines[this.displayLines.length - 1] =
                    node.promptChar + this.inputStr;
        } else if (e.key == "ArrowUp") {
            // redo last command 
            this.inputStr = this.lastInput;

            ctx.font = this.fontSize + "px " + this.textFont;
            let wrapped = this.textWrapLines(ctx, this.inputStr, this.xW - this.fontSize, 0);
            for (let i = 0; i < wrapped.length; i++) {
                if (i == 0) {
                    // keep promptChar
                    this.displayLines[this.displayLines.length-1] = this.promptChar + wrapped[i];
                } else {
                    this.displayLines.push(wrapped[i]);
                }
            }

        } else if (e.key == "ArrowDown") {
            // immediately finish typing effect
            this.textDisplayChar = 0;

        } else if (e.key == "Backspace") {
            if (this.inputStr.length > 0) {
                // command holder
                this.inputStr = this.inputStr.substring(0, this.inputStr.length - 1);

                // and displayed text
                let l = this.displayLines[this.displayLines.length-1];
                if (l.length > 0) {
                    // erase from last line
                    this.displayLines[this.displayLines.length-1] = l.substring(0, l.length-1);
                } else {
                    // or pop empty line and erase from prev
                    this.displayLines.pop();
                    l = this.displayLines[this.displayLines.length-1]
                    l = l.substring(0, l.length-1);
                }
            }

        } else {
            if (e.key != "Control" &&
                e.key != "Meta" &&
                e.key != "Shift" &&
                e.key != "Alt" &&
                e.key != "CapsLock" &&
                e.key != "ArrowLeft" &&
                e.key != "ArrowRight") {
                // add character to input
                this.inputStr += e.key;
                this.displayLines[this.displayLines.length-1] += e.key;
                // wrap if needed
                let maxWidth = this.xW - this.fontSize;
                ctx.font = this.fontSize + "px " + this.textFont;
                let width = (ctx.measureText(this.displayLines[this.displayLines.length-1]).width);
                if (width > maxWidth) {
                    if (this.displayLines[this.displayLines.length-1].split(" ").length > 1) {
                        // the command has a space
                        const lastIndex = this.displayLines[this.displayLines.length-1].lastIndexOf(" ");
                        const before = this.displayLines[this.displayLines.length-1].slice(0, lastIndex);
                        const after = this.displayLines[this.displayLines.length-1].split(" ");
                        this.displayLines[this.displayLines.length-1] = before;
                        this.displayLines.push(after[after.length-1]);
                    } else {
                        // no space in command break the line
                        let l = this.displayLines[this.displayLines.length-1];
                        this.displayLines[this.displayLines.length-1] = l.substring(0, l.length-1);
                        this.displayLines.push(l.substring(l.length));
                    }
                }
            }
        }
    }

    contains(x, y) {
        //console.log(`x: ${x} y: ${y} this.x: ${this.x1} this.y: ${this.y1}`)
        return this.x1 <= x && x <= this.x1 + this.xW &&
               this.y1 <= y && y <= this.y1 + this.yH;
    }

    setProxyText() {
        let text = this.proxyText;
        for (let i = 0; i < player.nodeStack.length; i++) {
            let str = nodes[player.nodeStack[i]].ip_address + 
            " " +  nodes[player.nodeStack[i]].country + "\n";
            // expand width working?
            if (ctx.measureText(str) > player.proxyWindow[0].xW) {
                player.proxyWindow[0].xW = ctx.measureText(str);
            }
            text += str;
        }

        player.proxyWindow[0].displayLines = [];
        player.proxyWindow[0].text = text;
        player.proxyWindow[0].setText(text, false);
    }
    
    openedState() {
        // initial text if needed
        if (this.displayLines.length == 0) {
            this.inputStr = "";
            this.setText(this.text);
        }

        // Set font and text color
        ctx.fillStyle = this.textColor;
        ctx.font = this.fontSize + "px " + this.textFont;

        // remove overflow lines, but don't crop scrolling windows
        if (this.type != "proxy" && this.type != "reader") {
            let keepHistory = 100;
            while (this.displayLines.length > this.textMaxLines + keepHistory) {
                this.displayLines.shift();
            }
        }
        
        // draw the text
        if (this.type == "audio") {
            // special handling 

        } else {
            // non-audio window text
            if (this.wheelOff > this.displayLines.length - this.textMaxLines) {
                this.wheelOff = this.displayLines.length - this.textMaxLines;
            }
            if (this.wheelOff < 0) {
                this.wheelOff = 0;
            }
            let max;
            if (this.textMaxLines < this.displayLines.length) {
                max = this.textMaxLines
            } else {
                max = this.displayLines.length;
            }
            let o = 0;
            if (this.type == "mail") {
                o = this.xW/10 * 2.6;
            }
            for (let i = this.wheelOff; i <  this.displayLines.length; i++) {
                if (i - this.wheelOff < this.textMaxLines) {
                ctx.fillText(
                    this.displayLines[i],
                    this.x1 + this.fontSize/2, 
                    this.y1 + o + (this.fontSize) + (this.fontSize * 1.25 * (i-this.wheelOff)));
                }
            }
        }
    }

    closedState() {
        if (cast.indexOf(this) == 0) {
            // always reopen player's computer win
             this.toOpen = true;
             this.delete = false;
             this.xW = getWidth()/3;
             this.yH = getHeight()/1.5;
             this.xP = 1;
             this.yP = 1;
        } else if (this.delete) {
            // first cleanse player.Arrays
            if (this.type == "proxy") {
                const index = player.proxyWindow.indexOf(this);
                if (index !== -1) {
                    player.proxyWindow.splice(index, 1);
                }
            } else if (this.type == "brute") {
                const index = player.bruteWindow.indexOf(this);
                if (index !== -1) {
                    player.bruteWindow.splice(index, 1);
                }
            } else if (this.type == "mail") {
                player.mailWindow = 0;
            } else if (this.type == "audio") {
                // there can be only one
                player.audioPlayer = 0;
                const index = cast.indexOf(this);
                if (index !== -1) {
                    cast.splice(index, 1);
                }
            } else if (this.type == "reader") {
                const index = player.readerWindow.indexOf(this);
                if (index !== -1) {
                    player.readerWindow.splice(index, 1);
                }
            }
            // finally remove it from cast too
            const indexC = cast.indexOf(this);
            if (indexC > -1) {
                cast.splice(indexC, 1);
            }
        }
    }

    textWrapLines(ctx, text, maxWidth, tabAsSpace) {
        const newLine = String.raw`\n`;
        const tab = String.raw`\t`;
        var lines = [];
        var paragraphs = text.split(newLine);
        var paragraphs = text.split('\n');

        for (var p = 0; p < paragraphs.length; p++) {
          var currentLine = [];  
          var words = paragraphs[p].split(" ");

          for (var i = 0; i < words.length; i++) {
            var phrase = words[i].split(tab);
            var word = "";

            if (phrase.length > 1) {
              for (var x = 0; x < phrase.length; x++) {
                if (phrase[x].length < 1) {
                  if (tabAsSpace == 1) {
                    word += "  ";
                  } else {
                    word += tab;
                  }
                } else {
                  word += phrase[x];
                }
              }
            } else {
              word += phrase;
            }

            var width = (ctx.measureText(currentLine + " " + word).width);
            if (width < maxWidth) {
              if (currentLine.length > 0) {
                currentLine += " " + word;
              } else {
                currentLine += word;
              }
            } else {
                lines.push(currentLine);

                // breakup urls and other long words
                while (ctx.measureText(word).width > maxWidth) {
                    let c = word.length;

                    while (ctx.measureText(word.slice(0, c)).width > maxWidth) {
                        c--;
                    }

                    lines.push(word.slice(0, c));
                    word = word.slice(c);
                }

                currentLine = word;
            }
          }
          lines.push(currentLine);
        } 
        return lines;
      }
}
