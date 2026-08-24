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

    // Remaining cards go into the stock/stack
    while (cardIndex < deck.length) {
        let card = spawnCardWin(deck[cardIndex],
                player.cX, 
                player.cY, 
                player.cScale)
        player.cStack.push(card);
        cardIndex++;
    }
}

function isSolitaireMatch(cardA, cardB) {
    const rank = {
        A: 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
        '7': 7, '8': 8, '9': 9, '10': 10,
        J: 11, Q: 12, K: 13
    };

    const suitA = cardA.card.slice(-1);
    const suitB = cardB.card.slice(-1);

    const rankA = rank[cardA.card.slice(0, -1)];
    const rankB = rank[cardB.card.slice(0, -1)];

    const redA = suitA === 'H' || suitA === 'D';
    const redB = suitB === 'H' || suitB === 'D';

    // cardB must be exactly one rank higher than cardA,
    // and the suits must alternate colors.
    return rankA !== 1 &&
           rankB === rankA + 1 &&
           redA !== redB;
}

function moveChildren(card) {
    while (card.childCard) {
        card.childCard.targetX = card.targetX;
        card.childCard.targetY = card.targetY + (30 * player.cScale);
        card = card.childCard;
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
    console.log("RESET CARD STACK")
    let hold = player.cDiscard.pop();
    for (let i = player.cDiscard.length-1; i > 0 ; i--) {
        const cur = player.cDiscard.pop();
        cur.shown = false;
        cur.targetX = player.cX;
        cur.targetY = player.cY;
        player.cStack.push(cur);
        console.log("stack, discard ", player.cStack,player.cDiscard)
    }
    player.cDiscard.push(hold);
}
