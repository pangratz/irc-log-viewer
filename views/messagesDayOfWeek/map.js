function(doc) {
    if (doc.date) {
        var d = new Date(doc.date),
        day = d.getDay();

        emit(day, 1);
    }
};