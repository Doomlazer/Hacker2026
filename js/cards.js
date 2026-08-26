function initSolitaire() {
    // solitare 7 rows, 4 holes, stack, discard
    shuffle(deck);
    player.cStored = false;
    cast[0].setText("Dealing...");
    let cardIndex = 0;

    for (let col = 0; col < 7; col++) {
        for (let row = 0; row <= col; row++) {
            let card = spawnCardWin(deck[cardIndex],
                player.cX + (col*(120*player.cScale)), 
                player.cY + (160*player.cScale) + (row*(30*player.cScale)), 
                player.cScale)
            player.cColumns[col].push(card);
            cardIndex++;
        }
    }

    // Remaining cards go into the stack
    while (cardIndex < deck.length) {
        let card = spawnCardWin(deck[cardIndex],
                player.cX, 
                player.cY, 
                player.cScale)
        player.cStack.push(card);
        cardIndex++;
    }
}

function isColumnMatch(cardA, cardB) {
    const rank = {
        A: 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
        '7': 7, '8': 8, '9': 9, '10': 10,
        J: 11, Q: 12, K: 13
    };

    const suitA = cardA.card.slice(-1);
    const suitB = cardB.card.slice(-1);

    const rankStringA = cardA.card.slice(0, -1);
    const rankStringB = cardB.card.slice(0, -1);

    const rankA = rank[rankStringA];
    const rankB = rank[rankStringB];

    const redA = suitA === 'H' || suitA === 'D';
    const redB = suitB === 'H' || suitB === 'D';

    /*console.log({
        cardA: cardA.card,
        cardB: cardB.card,
        suitA,
        suitB,
        rankStringA,
        rankStringB,
        rankA,
        rankB,
        redA,
        redB,
        rankCheck: rankB === rankA + 1,
        colorCheck: redA !== redB
    });*/

    return rankA !== 1 &&
           rankB === rankA + 1 &&
           redA !== redB;
}

function isAceholeMatch(cardA, cardB) {
    const rank = {
        A: 13, '2': 12, '3': 11, '4': 10, '5': 9, '6': 8,
        '7': 7, '8': 6, '9': 5, '10': 4,
        J: 3, Q: 2, K: 1
    };

    const suitA = cardA.card.slice(-1);
    const suitB = cardB.card.slice(-1);

    const rankA = rank[cardA.card.slice(0, -1)];
    const rankB = rank[cardB.card.slice(0, -1)];

    // cardB must be exactly one rank lower than cardA,
    // and have the same suit
    return rankA !== 1 &&
           rankB === rankA + 1 &&
           suitA === suitB;
}

function moveChildren(win) {
    while (win.childCard) {
        // set the child card to parent x/y
        win.childCard.x1 = win.x1;
        win.childCard.y1 = win.y1 + (30 * player.cScale);
        win.childCard.targetX = win.childCard.x1;
        win.childCard.targetY = win.childCard.y1;
        // do again for child if present
        win = win.childCard;
    }
}

function intersects(a, b) {
    return a.x1 < b.x1 + b.xW &&
            a.x1 + a.xW > b.x1 &&
            a.y1 < b.y1 + b.yH &&
            a.y1 + a.yH > b.y1;
}

function intersectsXY(a, bx, bw, by, bh) {
    return (
        a.x1 < bx + bw &&
        a.x1 + a.xW > bx &&
        a.y1 < by + bh &&
        a.y1 + a.yH > by
    );
}

function resetCardStack() {
    console.log("Moved discarded cards to stack")
    let hold = player.cDiscard.pop();
    for (let i = player.cDiscard.length-1; i > 0 ; i--) {
        const cur = player.cDiscard.pop();
        cur.shown = false;
        cur.targetX = player.cX;
        cur.targetY = player.cY;
        player.cStack.push(cur);
        //console.log("stack, discard ", player.cStack,player.cDiscard)
    }
    player.cDiscard.push(hold);
}

function checkEmptyColumn(win) {
    // snap to empty columns
    // variations also done in handleCardClick() and checkAceHoles
    const y = player.cY + (160 * player.cScale);
    const w = 100 * player.cScale;
    const h = 140 * player.cScale;

    for (let i = 0; i < 7; i++) {
        const x = player.cX + i * (120 * player.cScale);
        const theColumn = player.cColumns[i];
        // is the column empty and intersecting?
        if (
            intersectsXY(win, x, w, y, h) &&
            theColumn.length < 1
        ) {
            win.x1 = x;
            win.y1 = y;
            theColumn.push(win);
            win.targetX = win.x1;
            win.targetY = win.y1;
            moveChildren(win);

            return;
        
        } else if (
            // the top of the column stack
            theColumn.length > 0 &&
            !(theColumn[theColumn.length-1].shown) &
            intersectsXY(
                win,
                theColumn[theColumn.length-1].x1,
                w,
                theColumn[theColumn.length-1].y1,
                h
            )
        ) {
            win.x1 = theColumn[theColumn.length-1].x1;
            win.y1 = theColumn[theColumn.length-1].y1 + (30*player.cScale);
            theColumn.push(win);
            win.targetX = win.x1;
            win.targetY = win.y1;
            moveChildren(win);
            
            return;

        }
    }
}

function checkAceHoles(win) {
    // check the aceholes
    // variations also done in handleCardClick() and checkEmptyColumns()
    const y = player.cY;
    const w = 100 * player.cScale;
    const h = 140 * player.cScale;

    for (let i = 0; i < 4; i++) {
        const x = player.cX + (i + 3) * (120 * player.cScale);
        const theHole = player.cHoles[i];
        if (intersectsXY(win, x, w, y, h)) {
            // is the hole empty?
            if (theHole.length < 1) {
                // is Ace?
                if (win.card.slice(0, -1) === "A") {
                    theHole.push(win);
                    win.x1 = x;
                    win.y1 = y;
                    win.targetX = win.x1;
                    win.targetY = win.y1;
                    // break the parent/child bond
                    if (win.parentCard) {
                        win.parentCard.childCard = 0;
                    }
                    win.childCard = 0;
                    return;
                }
            } else if (win.card.slice(0, -1) !== "A") {
                // vaild match?
                let topCard = theHole[theHole.length-1];
                if (isAceholeMatch(win, topCard)) {
                    theHole.push(win);
                    win.x1 = x;
                    win.y1 = y;
                    win.targetX = win.x1;
                    win.targetY = win.y1;
                    // break the parent/child bond
                    if (win.parentCard) {
                        win.parentCard.childCard = 0;
                    }
                    win.childCard = 0;
                    return;
                }
            }
        }
    }
}

function handleCardClick(win) {
    // cardblocked?
    let blocked = false;
    for (let i of player.cColumns) {
        if (i.includes(win)) {
            // cards above it?
            if (i.indexOf(win) < i.length - 1) {
                blocked = true;
            }
        }
    }

    // clicked cStack
    if (
        win.targetX == player.cX &&
        win.targetY == player.cY && 
        player.cNotStoring && 
        !player.cStored
    ) {
        // deal car to right of stack
        win.shown = true;
        win.targetX = player.cX + (120 * player.cScale);
        setWindowPri(win);
        // move card from cStack. array to CDiscard
        player.cDiscard.push(player.cStack.pop());
        //console.log("stack to discard ", player.cStack,player.cDiscard)
        // return cards to stack
        if (player.cStack.length < 1) {
            // save top card and feed to stack
            resetCardStack();
        }
        return;
    }

    // dont change blocked card priority
    if (!blocked && player.cNotStoring && !player.cStored) {
        setWindowPri(win);
        if (!win.shown) {
            win.shown = true;
        } else {
            // move cards into acehole
            // variations are also done in checkEmptColumns & checkAceHoles()
            const suit = win.card.slice(-1);
            const rank = win.card.slice(0, -1);
            const y = player.cY;
            for (let i = 0; i < 4; i++) {
                const x = player.cX + (i + 3) * (120 * player.cScale);
                if (
                    rank === "A" && 
                    player.cHoles[i].length < 1 && 
                    win.childCard == 0 &&
                    win.shown
                ) {
                    // fill empty holes
                    popCard(win);
                    popCardFromColumn(win);
                    player.cHoles[i].push(win);
                    win.x1 = x;
                    win.y1 = y;
                    win.targetX = x;
                    win.targetY = y;
                    if (win.parentCard) {
                        win.parentCard.childCard = 0;
                    }
                    win.childCard = 0;
                    break;
                } else if (
                    win.childCard == 0 &&
                    (win.card.slice(0, -1) !== "A") &&
                    player.cHoles[i].length > 0
                ) {
                    // vaild match?
                    let topCard = player.cHoles[i][player.cHoles[i].length-1];
                    if (isAceholeMatch(win, topCard)) {
                        player.cHoles[i].push(win);
                        win.x1 = x;
                        win.y1 = y;
                        win.targetX = win.x1;
                        win.targetY = win.y1;
                        // break the parent/child bond
                        if (win.parentCard) {
                            win.parentCard.childCard = 0;
                        }
                        win.childCard = 0;
                        return;
                    }
                }
            }
        }
    }
}

function popCard(win) {
    // picked up card from cStack
    if (player.cStack.includes(win)) {
        player.cStack.pop();
        if (player.cStack.length < 1) {
            resetCardStack();
        }
    }
    // picked up card from cDiscard
    if (player.cDiscard.includes(win)) {
        player.cDiscard.pop();
    }
    // picked up card from acehole
    for (let i = 0; i < 4; i++) {
        if (player.cHoles[i].includes(win)) {
            player.cHoles[i].pop();
        }
    }
}

function popCardFromColumn(c) {
    for (let column of player.cColumns) {
        const index = column.indexOf(c);

        if (index !== -1) {
            column.splice(index, 1);
            break;
        }
    }
}

function purgeCardWindow() {
    for (const card of player.cardWindow) {
        const index = cast.indexOf(card);

        if (index !== -1) {
            //cast[0].setText("Delete..." + cast[index], false);
            cast.splice(index, 1);
        }
    }
    player.cardWindow = [];
}
