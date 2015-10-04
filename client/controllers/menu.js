Template.menu.events({
    "submit form": function(event, template) {
        /*
         *  - [X] Max Number of rows - 12
         *  - [X] Min number of columns - 5
         *  - [X] Max number of bombs < 15% of squares
         *  - [X] Min number of bombs > 2
         */
        event.preventDefault();
        if (event.target.sizeX.value <= 12 && event.target.sizeY.value > 5 && event.target.bombs.value > 2 && event.target.bombs.value / (event.target.sizeX.value * event.target.sizeY.value) <= .15) {
            Session.set("bombs", event.target.bombs.value);
            Session.set("row", event.target.sizeX.value);
            Session.set("column", event.target.sizeY.value);
            Session.set("menu", false);
            Session.set("clicks", 0);
            Session.set("playing", true);
            Session.set("flash", "");
            createBoard();
        } else {
            Session.set("flash", "Please enter a valid number");
        }
    }
});
