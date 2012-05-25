IRC.set('MessagesController', Ember.ArrayProxy.extend({
    content: [],
    loading: true,

    addMessage: function(msg) {
        var obj = Ember.Object.create({
            id: msg.id,
            username: msg.user.name,
            text: msg.text,
            date: IRC.createDate(msg.date)
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
            date: IRC.createDate(day.date),
            count: day.count
        }));
    },

    clear: function() {
        this.set('content', []);
    }
}));