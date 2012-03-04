function(doc) {
    if (doc.date) {
        var d = new Date(doc.date),
        h = d.getUTCHours(),
        m = d.getUTCMinutes(),
        s = d.getUTCSeconds(),
        ms = d.getUTCMilliseconds();

        emit([h, m, s, ms], 1);
    }
};