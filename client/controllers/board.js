function randInt(min, max) {
    /**
     * Thanks Mozilla for this
     */
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function placeBombs(x, board) {
    /**
     * Place X many bombs on the field (board)
     */
    for (var i = 0; i < x; i++) {
        var randomRow = randInt(0, Session.get("row") - 1);
        var randomColumn = randInt(0, Session.get("column") - 1);
        if (board[randomRow][randomColumn].bomb) {
            placeBombs(x - i, board);
        } else {
            board[randomRow][randomColumn].bomb = true;
        }
    }
}

createBoard = function() {
    /**
     * Create the board from session
     * variables and place it in the session
     */
    var board = [];
    var column = Session.get("column");
    var row = Session.get("row");

    for (var i = 0; i < row; i++) {
        board.push([]);
        for (var j = 0; j < column; j++) {
            board[i][j] = {
                x: i,
                y: j,
                bomb: false,
                flag: false,
                question: false,
                clicked: false,
                adjacent: false
            };
        }
    }
    placeBombs(Session.get("bombs"), board);
    Session.set("board", board);
}


Template.board.helpers({
    board: function() {
        return Session.get("board");
    },
    classes: function(cell) {
        var classes = "";
        /* Order matters, this doesn't preserve it
        for (var key in cell) {
            if (cell[key] && key !== "bomb") {
                classes += " " + key + "-" + cell[key]; 
            }
        }
        */
        if (cell.flag) {
            classes = "flag-true";
        }
        if (cell.question) {
            classes = "question-true";
        }

        if (cell.bomb && cell.clicked) {
            classes = "bomb-true";
        } else if (cell.clicked) {
            classes = "clicked-true";
        } 

        if (cell.adjacent) {
            classes = "adjacent-" + cell.adjacent;
        }

        return classes;
    }
});
