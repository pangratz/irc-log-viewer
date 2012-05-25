function(doc) {
    if (doc.user) {
        var d = new Date(doc.date),
        Y = d.getUTCFullYear(),
        M = d.getUTCMonth(),
        D = d.getUTCDate(),
        h = d.getUTCHours(),
        m = d.getUTCMinutes(),
        s = d.getUTCSeconds(),
        ms = d.getUTCMilliseconds();

        var user = doc.user;

        emit([user.name, Y, M, D, h, m, s, ms], 1);
    }
};