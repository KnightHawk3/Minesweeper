Template.won.events({
    "submit form": function(event, template) {
        event.preventDefault();
        Highscores.insert({
            name: event.target.username.value,
            bombs: Session.get("bombs"),
            rows: Session.get("row"),
            columns: Session.get("column"),
            clicks: Session.get("clicks")
        });
        Session.set("won", false);
        Session.set("highscore", true);
    }
});
