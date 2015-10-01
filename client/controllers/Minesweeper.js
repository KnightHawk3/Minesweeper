Session.set("clicks", 0)

Template.body.helpers({
    debug: true
});

Template.body.events({
    "click .box": function(event, template) {
        if (Session.get("reveal")) {
            click(this.x, this.y);
        } else if (Session.get("question")) {
            question(this.x, this.y);
        } else if (Session.get("flag")) {
            flag(this.x, this.y);
        }
    }
});


function click(x, y) {
    /**
     * Clicks a cell
     */
    var board = Session.get("board");
    console.table(Session.get("board"));
    Session.set("clicks", Session.get("clicks") + 1);

    if (board[x][y].bomb) {
        // RIP
        board[x][y].clicked = true;
        loseGame();
    } else {
        //revealSquares(x, y);
        board[x][y].clicked = true;
        //adjacent = checkAdjacentSquares(x, y);
    }
    Session.set("board", board);
}

function question(x, y) {
    /**
     * Question Marks a cell
     */
    var board = Session.get("board");
    Session.set("clicks", Session.get("clicks") + 1);
    board[x][y].question = true;
    Session.set("board", board);
}

function flag(x, y) {
    /**
     * Flag a cell
     */
    var board = Session.get("board");
    Session.set("clicks", Session.get("clicks") + 1);
    board[x][y].flag = true;
    checkIfWon(board);
    Session.set("board", board);
}

function checkIfWon(board) {
    var wincounter = 0;
    for (var i = 0; i < Session.get("columns"); i++) {
        for (var j = 0; j < Session.get("rows"); j++) {
            if (board[i][j].bomb == true) {
                wincounter = wincounter + 1;
                console.log("bomb");
            }
        }
    }
    console.log(wincounter);
    if (wincounter == Session.get("bombs")) {
        winGame();
    }
}

