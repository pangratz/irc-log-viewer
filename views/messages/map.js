function(doc) {
    if (doc.date && doc.user && doc.user.room) {
        var d = new Date(doc.date),
        Y = d.getUTCFullYear(),
        M = d.getUTCMonth(),
        D = d.getUTCDate(),
        h = d.getUTCHours(),
        m = d.getUTCMinutes(),
        s = d.getUTCSeconds(),
        ms = d.getUTCMilliseconds();

        emit([Y, M, D, h, m, s, ms], 1);
    }
};