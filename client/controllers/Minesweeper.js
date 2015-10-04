Session.set("clicks", 0);
Session.set("menu", true);
Session.set("playing", false);
Session.set("won", false);
Session.set("lost", false);

Template.body.helpers({
    debug: true,
    isMenu: function() {
        return Session.get("menu");
    },
    isPlaying: function() {
        return Session.get("playing");
    },
    flash: function() {
        return Session.get("flash");
    }, 
    hasLost: function() {
        return Session.get("lost");
    }, 
    hasWon: function() {
        return Session.get("won");
    },
    isHighscore: function() {
        return Session.get("highscore");
    },
});

/* Not much point in making a file for this */
Template.highscore.helpers({
    entries: function() {
        // Sort by how many clicks, like golf

        /* "Sort by fewest number of clicks and
         * break ties by who had more bombs" */
        return Highscores.find({}, {sort: {clicks: -1, bombs: 1}, limit: 15});
    },
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
    },
    "click #highscore": function(event, template) {
        Session.set("clicks", 0);
        Session.set("menu", false);
        Session.set("playing", false);
        Session.set("won", false);
        Session.set("lost", false);
        Session.set("highscore", true);
    },
    "click #newgame": function(event, template) {
        Session.set("clicks", 0);
        Session.set("menu", true);
        Session.set("playing", false);
        Session.set("won", false);
        Session.set("lost", false);
        Session.set("highscore", false);
    }
});

function getAdjacentBombs(board, x, y) {
    var bombcount = 0;
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (x - i >= 0 && x - i < Session.get("row")) {
                if (y - j >= 0 && y - j < Session.get("column")) {
                    if (board[x - i][y - j].bomb) {
                        bombcount++;
                    }
                }
            }
        }
    }
    return bombcount;
}

function cascadeSquares(board, x, y) {
    var bombcount = getAdjacentBombs(board, x, y);
    if (bombcount === 0) {
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if (x - i >= 0 && x - i < Session.get("row")) {
                    if (y - j >= 0 && y - j < Session.get("column")) {
                        if (board[x - i][y - j].clicked) {
                            // Don't reprocess them.
                        } else {
                            board[x-i][y-j].clicked = true;
                            board = cascadeSquares(board, x-i, y-j);
                        }
                    }
                }
            }
        }
        board[x][y].adjacent = 0;
    } else {
        board[x][y].adjacent = bombcount;
    }
    return board;
}

function loseGame() {
    Session.set("lost", true);
    Session.set("playing", false);
    board = []; // "Garbage Collection"
}

function winGame() {
    Session.set("won", true);
    Session.set("playing", false);
    board = []; // "Garbage Collection"
}

function click(x, y) {
    /**
     * Clicks a cell
     */
    var board = Session.get("board");
    Session.set("clicks", Session.get("clicks") + 1);

    if (board[x][y].bomb) {
        // RIP
        board[x][y].clicked = true;
        var bang = new Audio('/audio/bang.mp3');
        bang.play();
        loseGame();
    } else {
        board = cascadeSquares(board, x, y);
        board[x][y].clicked = true;
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
    for (var i = 0; i < Session.get("column"); i++) {
        for (var j = 0; j < Session.get("row"); j++) {
            if (board[i][j].flag) {
                if (board[i][j].bomb) {
                    wincounter = wincounter + 1;
                } else {
                    wincounter = wincounter - 1;
                }
            }
        }
    }
    if (wincounter == Session.get("bombs")) {
        winGame();
    }
}
