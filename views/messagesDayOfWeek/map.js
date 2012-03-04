function(doc) {
    if (doc.date) {
        var d = new Date(doc.date),
        day = d.getUTCDay();

        emit(day, 1);
    }
};