IRC.set('messagesController', Ember.ArrayProxy.create({
    content: [],

    addMessage: function(msg) {
        var obj = Ember.Object.create({
            username: msg.user.name,
            text: msg.text,
            date: IRC.createDateTime(msg.date)
        });
        this.pushObject(obj);
    }
}));

IRC.set('daysController', Ember.ArrayProxy.create({
    content: [],

    addDay: function(day) {
        this.pushObject(Ember.Object.create(day));
    }
}));