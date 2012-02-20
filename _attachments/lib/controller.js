IRC.set('MessagesController', Ember.ArrayProxy.extend({
    content: [],
    loading: true,

    addMessage: function(msg) {
        var message = '';
        if (msg.hasOwnProperty('text')) {
            message = msg.text;
        } else if (msg.hasOwnProperty('message') && msg.message.hasOwnProperty('text')) {
            message = msg.message.text;
        }
        var username = (msg.user) ? msg.user.name: msg.message.user.name;
        var obj = Ember.Object.create({
            id: msg.id,
            username: username,
            text: message,
            date: IRC.createDateTime(msg.date)
        });
        this.pushObject(obj);
    },

    clear: function() {
        this.set('content', []);
    }
}));

IRC.set('DaysController', Ember.ArrayProxy.extend({
    content: [],
    loading: true,

    addDay: function(day) {
        this.pushObject(Ember.Object.create({
            date: IRC.createDateTime(day.date),
            count: day.count
        }));
    },

    clear: function() {
        this.set('content', []);
    }
}));