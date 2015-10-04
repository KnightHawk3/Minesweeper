Template.navbar.helpers({
    active: function(item) {
        if (Session.get(item)) {
            return "active";
        }
    }
});
