Session.set("row", 10);
Session.set("column", 10);
Session.set("bombs", 5);
Session.set("debug", true);

var column = Session.get("column");
var row = Session.get("row");

var board = [];

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (var i = 0; i < row; i++) {
    board.push([]);
    for (var j = 0; j < column; j++) {
        board[i][j] = {
            x: i,
            y: j,
            bomb: false,
            flag: false,
            question: false,
            clicked: false
        };
    }
}

for (var i = 0; i < Session.get("bombs"); i++) {
    board[randInt(0, Session.get("row"))][randInt(0, Session.get("column"))].bomb = true;
}

Session.set("board", board);

Template.board.helpers({
    board: function() {
      return Session.get("board");
    }
});

if (Session.get("debug")) {
    console.table(board);
}
