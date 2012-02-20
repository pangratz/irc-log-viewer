require('./core');
require('./controller');
require('./templates');
require('./views');

IRC.MessagesView.appendTo('#messages');
IRC.DaysView.appendTo('#days');

IRC.set('daysController', IRC.DaysController.create());
IRC.set('messagesController', IRC.MessagesController.create());

IRC.set('dataSource', Ember.Object.create({

    loadDay: function(day) {
        IRC.messagesController.clear();
        var from = day || IRC.createDateTime();
        var to = from.advance({
            day: 1
        });
        $.couch.db('irc').view('irc/messages', {
            success: function(data) {
                if (data && data.rows && data.rows.length > 0) {
                    data.rows.forEach(function(row) {
                        IRC.messagesController.addMessage(row.doc);
                    });
                }
            },
            include_docs: true,
            reduce: false,
            startkey: IRC.getDateArray(from, 'year', 'month', 'day'),
            endkey: IRC.getDateArray(to, 'year', 'month', 'day')
        });
    }

}));
IRC.dataSource.loadDay(IRC.createDateTime().adjust({
    hour: 0,
    timezone: 0
}));

$.couch.db('irc').view('irc/messages', {
    success: function(data) {
        if (data && data.rows && data.rows.length > 0) {
            data.rows.forEach(function(doc) {
                var key = doc.key;
                var date = Ember.DateTime.create().adjust({
                    year: key[0],
                    month: key[1],
                    day: key[2],
                    hour: 0,
                    timezone: 0
                });
                IRC.daysController.addDay({
                    date: date,
                    count: doc.value
                });
            });
        }
    },
    group_level: 3
});