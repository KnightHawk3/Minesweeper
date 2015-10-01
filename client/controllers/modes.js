Session.set("reveal", true);
Session.set("question", false);
Session.set("flag", false);

Template.modes.events({
    "click .reveal": function(event, template) {
        Session.set("reveal", true);
        Session.set("question", false);
        Session.set("flag", false);
    },
    "click .flag": function(event, template) {
        Session.set("reveal", false);
        Session.set("question", false);
        Session.set("flag", true);
    },
    "click .question": function(event, template) {
        Session.set("reveal", false);
        Session.set("question", true);
        Session.set("flag", false);
    }
});
