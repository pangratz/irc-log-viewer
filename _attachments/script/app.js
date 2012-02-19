$(function() {

    // taken from http://www.simonwhatley.co.uk/parsing-twitter-usernames-hashtags-and-urls-with-javascript
    String.prototype.parseURL = function() {
        return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&#~\?\/.=]+/g,
        function(url) {
            return url.link(url);
        });
    };

    Handlebars.registerHelper('format',
    function(property, format) {
        var dateFormat;
        if (Ember.typeOf(format) === 'string') {
            dateFormat = format;
        }
        var value = Ember.getPath(this, property);
        value = value.toFormattedString(dateFormat);
        return new Handlebars.SafeString(value);
    });

    Handlebars.registerHelper('parse',
    function(property) {
        var value = Ember.getPath(this, property);
        value = Handlebars.Utils.escapeExpression(value);
        value = value.parseURL();
        return new Handlebars.SafeString(value);
    });

    IRC = Ember.Application.create({
        db: $.couch.db('irc-logs'),

        getDateArray: function(date) {
            var a = [];
            for (var i = 1; i < arguments.length; i++) {
                var str = arguments[i];
                a.push(date.get(str));
            }
            return a;
        },

        loadDate: function(from, to) {
            var toDate = to || from.advance({
                day: 1
            });
            IRC.messagesController.clearData();
            this.get('db').view('irc/messages', {
                success: function(data) {
                    IRC.messagesController.set('day', from);
                    if (data && data.rows && data.rows.length > 0) {
                        data.rows.forEach(function(row) {
                            IRC.messagesController.addMessage(row.doc);
                        });
                    }
                },
                include_docs: true,
                reduce: false,
                startkey: IRC.getDateArray(from, 'year', 'month', 'day'),
                endkey: IRC.getDateArray(toDate, 'year', 'month', 'day')
            });
        }
    });

    IRC.DayView = Ember.View.extend({
        showDay: function(view, event, ctx) {
            IRC.loadDate(ctx.date);
            return true;
        }
    });
    IRC.MessagesView = Ember.View.extend({
        messagesBinding: 'IRC.messagesController',
        dayBinding: 'IRC.messagesController.day',
        formattedDay: function() {
            var day = this.get('day');
            if (day) {
                return day.toFormattedString('%Y-%m-%d');
            }
            return '';
        }.property('day').cacheable()
    });

    IRC.daysController = Ember.ArrayProxy.create({
        content: [],

        addDay: function(doc) {
            var key = doc.key;
            var date = Ember.DateTime.create({
                year: key[0],
                month: key[1],
                day: key[2]
            });
            this.pushObject({
                date: date,
                count: doc.value
            });
        }
    });

    IRC.messagesController = Ember.ArrayProxy.create({
        content: [],
        day: undefined,

        clearData: function() {
            this.set('content', []);
            this.set('day', undefined);
        },

        addMessage: function(doc) {
            var time = new Date(doc.date).getTime();
            var date = Ember.DateTime.create(time).adjust({
                'timezone': 0
            });
            if (doc.message) {
                // old version
                this.pushObject({
                    message: doc.message.text,
                    user: doc.message.user.name,
                    date: date
                });
            } else if (doc.text) {
                // new version
                this.pushObject({
                    message: doc.text,
                    user: doc.user.name,
                    date: date
                });
            }
        }
    });

    var today = Ember.DateTime.create();
    IRC.loadDate(today);
    IRC.get('db').view('irc/messages', {
        success: function(data) {
            if (data && data.rows && data.rows.length > 0) {
                data.rows.forEach(function(row) {
                    IRC.daysController.addDay(row);
                });
            }
        },
        group_level: 3
    });

    IRC.get('db').changes(null, {
        "include_docs": "true"
    }).onChange(function(resp) {
        if (resp && resp.results && resp.results.length > 0) {
            resp.results.forEach(function(row) {
                IRC.messagesController.addMessage(row.doc);
            });
        }
    });

});