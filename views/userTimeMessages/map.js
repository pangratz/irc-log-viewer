function(doc) {
    if (doc.user || doc.message.user) {
        var d = new Date(doc.date),
        h = d.getHours(),
        m = d.getMinutes(),
        s = d.getSeconds(),
        ms = d.getMilliseconds();

        var user = doc.user || doc.message.user;

        emit([user.name, h, m, s, ms], 1);
    }
};