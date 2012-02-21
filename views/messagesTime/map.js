function(doc) {
    if (doc.date) {
        var d = new Date(doc.date),
        h = d.getHours(),
        m = d.getMinutes(),
        s = d.getSeconds(),
        ms = d.getMilliseconds();

        emit([h, m, s, ms], 1);
    }
};