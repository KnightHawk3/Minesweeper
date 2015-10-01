function randInt(min, max) {
    /**
     * Thanks Mozilla for this
     */
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// TODO: Set this somewhere else
Session.set("row", 10);
Session.set("column", 10);
Session.set("bombs", 5);

var column = Session.get("column");
var row = Session.get("row");

var board = [];


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

function placeBombs(x, board) {
    /**
     * Place X many bombs on the field (board)
     */
    for (var i = 0; i < x; i++) {
        var randomRow = randInt(0, Session.get("row") - 1);
        var randomColumn = randInt(0, Session.get("column") - 1);
        console.log(randomRow);
        console.log(randomColumn)
        if (board[randomRow][randomColumn].bomb) {
            placeBombs(x - i);
        } else {
            board[randomRow][randomColumn].bomb = true;
        }
    }
}

placeBombs(Session.get("bombs"), board);


Session.set("board", board);

Template.board.helpers({
    board: function() {
        return Session.get("board");
    },
    classes: function(cell) {
        var classes = "";
        if (cell["bomb"] && cell["clicked"]) {
            classes = "bomb-true";
        }
        for (var key in cell) {
            if (cell[key] && key !== "bomb") {
                classes += " " + key + "-" + cell[key]; 
            }
        }
        return classes;
    }
});

if (Session.get("debug")) {
    console.table(board);
}
