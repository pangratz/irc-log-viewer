function(doc) {
    if (doc.user || doc.message.user) {
        var d = new Date(doc.date),
        Y = d.getFullYear(),
        M = d.getMonth() + 1,
        D = d.getDate(),
        h = d.getHours(),
        m = d.getMinutes(),
        s = d.getSeconds(),
        ms = d.getMilliseconds();

        var user = doc.user || doc.message.user;

        emit([user.name, Y, M, D, h, m, s, ms], 1);
    }
};