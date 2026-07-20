class aniRect {
    constructor(x, y, width, height) {
        this.opaqueBackground = true;
        this.doubleBoarder = true;
        this.isComputerIcon = false;
        this.doubleBoarderWidth = width/20;
        this.doubleBoarderHeight = height/20;
        this.cornerRad = 20;
        this.toOpen = true;
        this.delete = false;
        this.aniSpeed = 0.01;
        this.ease = 0.075;
        this.x1 = x;
        this.y1 = y;
        this.xP = 0;
        this.yP = 0;
        this.xW = width;
        this.yH = height;
        this.color = '#00b32a';
        this.textColor = '#ffffff';
        this.textFont = "Hyperspace";
        this.backgroundColor = '#044114';
        this.lineWidth = 1;
        this.boarderLineWidth = 10;
        this.textScale = 0.00005;
        this.textLines = []
        this.textMaxLines = 16;
        this.admins = [];
        this.approvedComands = ["su"];
        this.textDisplayChar = 0;
        this.typingEffect = true;
        this.date = "07/18/2026:19:37"
        this.locNum = getRandInt(locations.length);
        this.text = `Welcome to the mal-90 OS\n   It's ${this.date}\nregistered to: ${locations[this.locNum].homeowner} 
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accUnited Statesntium doloremque laudantium, 
        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 
        dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
        sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro 
        quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non 
        numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim 
        ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid 
        ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse 
        quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
        `;
        this.inputStr = "";
        this.acceptInput = false;
        this.lastInput = "";
    }

    setText(theText) {
        this.textLines = this.textWrapLines(ctx, theText, (this.xW/20)*18, 0);
    }

    clickHandler(e) {
        //console.log(`clicked on ${this} e.details: ${e.detail}`);
        if (e.detail > 1) {
            mouseUnclaimed = false;
            this.toOpen = false;
            this.delete = true;
        }
    }

    keyHandler(e) {
        //console.log(`key pressed: ${e.key}`);
        if (this.textDisplayChar < this.text.length) {
            this.textDisplayChar = this.text.length;
        }
        if (e.key == "Enter") {
            this.lastInput = this.inputStr;
            this.commandHandler();
        } else if (e.key == "ArrowUp") {
            this.inputStr = this.lastInput;
        } else if (e.key == "ArrowDown") {
            this.textDisplayChar = 0;
        } else if (e.key == "Backspace") {
            this.inputStr = this.inputStr.substring(0, this.inputStr.length - 1);
        } else {
            if (e.key != "Shift" &&
                e.key != "ArrowLeft" &&
                e.key != "ArrowRight") {
                this.inputStr += e.key;
            }
        }
        this.setText(this.inputStr);
    }

    commandHandler() {
        const command = this.inputStr.split(" ");
        this.inputStr = "";
        //console.log(this);
        // all systems must have an exit command, approved commands and admins are optional
        if (this.approvedComands.includes(command[0].toLowerCase())
            || this.admins.includes(player.uid)
            || command[0].toLowerCase() == "exit") {
            if (command[0].toLowerCase() == "exit") {
                this.text = "Goodbye..."
                this.toOpen = false;
                this.delete = true;
            }

            if (command[0].toLowerCase() == "clear") {
                this.text = 'Cleared';
                mapXOff = getWidth()/2;
                mapYOff = getHeight()/2;
                mapScale = 4;
                mapSteps = 0;
                mapInc = 2;
                this.textDisplayChar = 0;
                this.setText(this.text);
                updateMap = true;
            }

            if (command[0].toLowerCase() == "su") {
                // make uid admin: su 34093
                let user = player.uid;
                if (command[1] > 0) {
                    user = command[1];
                }
                // delet user: su -r 777
                if (command[1] && command[1].toLowerCase() == "-r") {
                    user == command[2];
                    if (user >= locations.length) {
                        this.text = `Invalid user, ${user} does not exist`;
                    } else if (this.admins.includes(user)) {
                        const s = this.admins.splice(1, user);
                        this.admins = s;
                        this.text = this.text = `Deleted user ${locations[user].homeowner} from admins group. \n`;
                    } else {
                        this.text = `Error: ${user} does not exist in admins group`;
                    }
                } else {
                    if (user >= locations.length) {
                        this.text = `Invalid user ${user} of only ${locations.length} known users`;
                    } else if (this.admins.includes(user)) {
                        this.text = this.text = `Error: ${locations[user].homeowner} is already in the admins group. \n`;
                    } else {
                        this.text = `${locations[user].homeowner} has been added to the super users group. \n`;
                        this.text += " \n ";
                        this.admins.push(user);
                        for (let i = 0; i < this.admins.length; i++) {
                            this.text += locations[this.admins[i]].homeowner + " (" + this.admins[i] + ")";
                            console.log(`i: ${i}, this.admins.lenght): ${this.admins.length}`);
                            if (i < this.admins.length -1 && this.admins.length > 1) {
                                this.text +=  ", \n";
                            }
                        }
                    }
                }

                this.textDisplayChar = 0;
                this.setText(this.text);
            }

            if (command[0].toLowerCase() == "zoom") {
                if (command[1] < 0 || command[1] > 0) {
                    mapScale += parseInt(command[1]);
                } else {
                    mapScale ++;
                }
                mapInc = 2;
                mapSteps = 0;
                updateMap = true;
                this.text = `Map Zoom is now ${mapScale}`;
                this.setText(this.text);
                this.textDisplayChar = 0;
            }

            if (command[0].toLowerCase() == "scan") {
                if (command.length = 1) {
                    // default country scan
                    this.textDisplayChar = 0;
                    this.text = `Scanning ${player.selCity}: \n`;
                    for (let i = 0; i < 100; i++) {
                        const r = getRandInt(nodes.length);
                        if (nodes[r].country == player.selCity && !nodes[r].discoverd) {
                            nodes[r].discovered = true;
                            this.text += `Found...${nodes[r].ip_address}\n`;
                            this.setText(this.text);
                            mapNodeSteps = 0;
                            updateMap = true;
                        }
                    }
                    this.text += "Scan Complete"
                }
            }

            if (command[0].toLowerCase() == "reg") {
                // show registerd user
                this.text = "";
                let l = locations[this.locNum];
                this.text += l.homeowner + ", \n";
                this.text += l["address"].street_number + " ";
                this.text += l["address"].street_name + ", \n";
                this.text += l["address"].district + ", ";
                this.text += l["address"].city + ", \n";
                this.text += l["address"].region + " ";
                this.text += l["address"].postal_code + " \n";
                this.text += l["address"].country;
                //console.log(this.text);
                this.textDisplayChar = 0;
                this.setText(this.text);
            }
            if (command[0].toLowerCase() == "setparam") {
                //console.log(`this[command[1]]: ${this[command[1]]}`);
                // player enters: setparm textColor #FF0000
                if (command[1].toLowerCase() == "list") {
                    this.text = "";
                    for (var key in this) {
                        if (this.hasOwnProperty(key)) {
                            //console.log(key);
                            this.text += key + ", ";
                        }
                    }
                }

                switch (typeof this[command[1]]) {
                    case ("boolean"):
                        if (command[2].toLowerCase() == "false") {
                            this[command[1]] = false;
                        } else {
                            this[command[1]] = true;
                        }
                        break;
                    default:
                        this[command[1]] = command[2];
                }
                this.setText(`RESULT this[${command[1]}]: ${this[command[1]]}`);
                //console.log(this);
            }
        } else {
            this.textDisplayChar = 0;
            this.text = "Command failed. Either the command does not exist or you do not have permission to use it.";
            this.setText(this.text);
        }
    }

    contains(x, y) {
        //console.log(`x: ${x} y: ${y} this.x: ${this.x1} this.y: ${this.y1}`)
        return this.x1 <= x && x <= this.x1 + this.xW &&
               this.y1 <= y && y <= this.y1 + this.yH;
    }

    draw() {
        // update the animation, blit the rect and then if fully open draw text.

        if (this.toOpen) {
            if (this.xP < this.xW) {
                this.xP += this.aniSpeed;
                if (this.xP > this.xW) {
                    this.xP = this.xW;
                }
            }
            if (this.yP < this.yH) {
                this.yP += this.aniSpeed;
                if (this.yP > this.yH) {
                    this.yP = this.yH;
                }
            }

            this.blitRect();

            if (this.xP == this.xW && this.yP == this.yH) {
                this.openedState();
            } else {
                this.aniSpeed += this.ease;
            }

        } else {
            if (this.xP > 0) {
                this.xP -= this.aniSpeed;
                if (this.xP < 0) {
                    this.xP = 0;
                }
            }
            if (this.yP > 0) {
                this.yP -= this.aniSpeed;
                if (this.yP < 0) {
                    this.yP = 0;
                }
            }
            
            this.blitRect();

            //console.log(this.xP,this.yP,this.x1,this.y1);
            if (this.xP == 0 && this.yP == 0) {
                this.closedState();
            } else {
                this.aniSpeed -= this.ease;
            }
        }
    }

    blitRect() {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        if (this.xP > 0 || this.yP > 0) {
            // background
            if (this.opaqueBackground) {
                ctx.fillStyle = this.backgroundColor;
                //ctx.fillRect(this.x1, this.y1, this.xP, this.yP);
                ctx.beginPath();
                ctx.roundRect(this.x1, this.y1, this.xP, this.yP, this.cornerRad);
                ctx.fill();
            }
            //ctx.strokeRect(this.x1, this.y1, this.xP, this.yP);
            // main rect
            ctx.beginPath();
            ctx.roundRect(this.x1, this.y1, this.xP, this.yP, this.cornerRad);
            ctx.stroke();

            // boarder
            ctx.lineWidth = this.boarderLineWidth;
            if (this.isComputerIcon) {
                ctx.beginPath();
                ctx.roundRect(this.x1 - (this.doubleBoarderWidth * (this.xP/this.xW)),
                                this.y1 - (this.doubleBoarderHeight * (this.yP / this.yH)),
                                this.xP + ((this.doubleBoarderWidth * (this.xP/this.xW)) * 2),
                                this.yP + ((this.doubleBoarderHeight * (this.yP / this.yH)) * 7),
                                this.cornerRad);
                ctx.stroke();
            } else if (this.doubleBoarder) {
                ctx.beginPath();
                ctx.roundRect(this.x1 - (this.doubleBoarderWidth * (this.xP/this.xW)),
                                this.y1 - (this.doubleBoarderHeight * (this.yP / this.yH)),
                                this.xP + ((this.doubleBoarderWidth * (this.xP/this.xW)) * 2),
                                this.yP + ((this.doubleBoarderHeight * (this.yP / this.yH)) * 2),
                            this.cornerRad);
                ctx.stroke();
            }
        }
    }
    
    openedState() {
        //ctx.font = scaleFont(this.textScale * this.xW, "Hyperspace"); //"40px Hyperspace";
        ctx.font = scaleFont(this.textScale * this.xW, "Hyperspace"); //"40px Hyperspace";

        // Wrap and draw text in rect, optionally add letters one at a time. 
        if (this.typingEffect && this.textDisplayChar < this.text.length) {
            this.textDisplayChar ++;
            this.setText(this.text.substring(0, this.textDisplayChar));
            this.acceptInput = true;
        } else if (this.textLines.length == 0) {
            // init wrap if needed
            this.textDisplayChar = this.text.length;
            this.setText(this.text.substring(0, this.textDisplayChar));
            this.acceptInput = true;
        }

        // draw the text
        ctx.fillStyle = this.textColor;
        ctx.font = scaleFont(0.018, "Hyperspace");
        if (this.textLines.length - this.textMaxLines > 0 ) {
            this.textLines = this.textLines.slice(this.textLines.length - this.textMaxLines, this.textLines.length)
        }
        for (let i = 0; i < this.textLines.length; i++ ) {
            //ctx.fillText(this.textLines[i], this.x1 + (this.xW/20), this.y1 + (this.yH/8) + (this.yH/8*i));
            
                ctx.fillText(this.textLines[i], this.x1 + 
                            (this.xW/20), this.y1 * 1.5 + 
                            (this.xW/20 * 1.2 * i));
        }
    }

    closedState() {
        this.textDisplayChar = 0;
        //console.log(`cast.indexOf(this): ${cast.indexOf(this)}`)
        if (this.delete) {
            const s = cast.splice(1, cast.indexOf(this));
            cast = s;
            let testRect = new aniRect(getRandInt(getWidth()), getRandInt(getHeight()),
                                        500, 500);
            cast.push(testRect);
        }
    }

    textWrapLines(ctx, text, maxWidth, tabAsSpace) {
        const newLine = String.raw`\n`;
        const tab = String.raw`\t`;
        var lines = [];
        var paragraphs = text.split(newLine);
        var paragraphs = text.split('\n');

        for (var p = 0; p < paragraphs.length; p++) {
          var words = paragraphs[p].split(" ");
          var currentLine = [];

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
                currentLine = word;
            }
          }
          lines.push(currentLine);
        } 
        return lines;
      }
}
