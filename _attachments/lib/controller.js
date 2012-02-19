IRC.set('MessagesController', Ember.ArrayProxy.extend({
    content: [],

    addMessage: function(msg) {
        var message = msg.text || msg.message.text;
        var username = (msg.user) ? msg.user.name : msg.message.user.name;
        var obj = Ember.Object.create({
            id: msg.id,
            username: username,
            text: message,
            date: IRC.createDateTime(msg.date)
        });
        this.pushObject(obj);
    }
}));

IRC.set('DaysController', Ember.ArrayProxy.extend({
    content: [],

    addDay: function(day) {
        this.pushObject(Ember.Object.create({
            date: IRC.createDateTime(day.date),
            count: day.count
        }));
    }
}));