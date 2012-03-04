require('./core');

IRC.CouchDBDataSource = Ember.Object.extend({

    loadDay: function(day) {
        var messagesController = this.get('messagesController');
        messagesController.clear();
        messagesController.set('loading', true);
        var from = day || IRC.createDateTime();
        var to = from.advance({
            day: 1
        });
        messagesController.set('date', from);
        $.couch.db('irc').view('viewer/messages', {
            success: function(data) {
                if (data && data.rows && data.rows.length > 0) {
                    data.rows.forEach(function(row) {
                        messagesController.addMessage(row.doc);
                    });
                }
                messagesController.set('loading', false);
            },
            include_docs: true,
            reduce: false,
            startkey: IRC.getDateArray(from, 'year', 'month', 'day'),
            endkey: IRC.getDateArray(to, 'year', 'month', 'day')
        });
    },

    loadDays: function() {
        var daysController = this.get('daysController');
        $.couch.db('irc').view('viewer/messages', {
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
                        daysController.addDay({
                            date: date,
                            count: doc.value
                        });
                    });
                }
                daysController.set('loading', false);
            },
            group_level: 3,
            descending: true
        });
    }

});