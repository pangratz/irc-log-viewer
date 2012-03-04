function(doc) {
    if (doc.user) {
        var d = new Date(doc.date),
        day = d.getUTCDay();

        var user = doc.user;

        emit([user.name, day], 1);
    }
};