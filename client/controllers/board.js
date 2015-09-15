Session.set("row", 10);
Session.set("column", 10);

var column = Session.get("column");
var row = Session.get("row");

var board = [[]];

for (var i = 0; i < row; i++) {
    for (var j = 0; j < column; j++) {
        board[i][j] = {
            x: i,
            y: j,
            bomb: false,
            flag: false,
            clicked: false
        };
    }
    board.push([]);
}

Session.set("board", board);

Template.board.helpers({
    board: function() {
      return Session.get("board");
    }
});