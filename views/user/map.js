function(doc) {
    if (doc.user) {
        var user = doc.user;
        emit(user.name, 1);
    }
};