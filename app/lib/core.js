require('jquery');
require('ember');

/* YES and NO globals needed in datetime */
window.YES = true;
window.NO = false;
require('irc/datetime');

IRC = Ember.Application.create({
    VERSION: '0.0.1-snapshot',

    createDateTime: function(date) {
        if (arguments.length === 0) {
            return Ember.DateTime.create().adjust({
                timezone: 0
            });
        }
        if (date && Ember.DateTime.detectInstance(date)) {
            return date.adjust({
                timezone: 0
            });
        }

        var dateObj = (Ember.typeOf(date) === 'string') ? new Date(date) : date;
        var time = dateObj.getTime();
        return Ember.DateTime.create(time).adjust({
            timezone: 0
        });
    },

    getDateArray: function() {
        var date = arguments[0];
        var a = [];
        for (var i = 1; i < arguments.length; i++) {
            a.push(date.get(arguments[i]));
        }
        return a;
    },

    loadDate: function(view, event, day) {
        var date = Ember.getPath(day, 'date');
        var dataSource = Ember.getPath(this, 'dataSource');
        if (dataSource) {
            dataSource.loadDay(date);
        }
    }

});