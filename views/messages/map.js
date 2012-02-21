function(doc) {
    if (doc.date) {
        var d = new Date(doc.date),
        Y = d.getFullYear(),
        M = d.getMonth() + 1,
        D = d.getDate(),
        h = d.getHours(),
        m = d.getMinutes(),
        s = d.getSeconds(),
        ms = d.getMilliseconds();

        emit([Y, M, D, h, m, s, ms], 1);
    }
};