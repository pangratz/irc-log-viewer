function(doc) {
    if (doc.user || doc.message.user) {
        var user = doc.user || doc.message.user;
        emit(user.name, 1);
    }
};