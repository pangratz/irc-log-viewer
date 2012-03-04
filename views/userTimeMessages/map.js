function(doc) {
    if (doc.user) {
        var d = new Date(doc.date),
        h = d.getUTCHours(),
        m = d.getUTCMinutes(),
        s = d.getUTCSeconds(),
        ms = d.getUTCMilliseconds();

        var user = doc.user;

        emit([user.name, h, m, s, ms], 1);
    }
};