require('jquery');
require('ember');
require('moment');
require('jquery.couch');

IRC = Ember.Application.create({
    VERSION: '0.0.1-snapshot',

    dateStrDict: {
        year: 'year',
        month: 'month',
        day: 'date',
        hour: 'hours',
        minute: 'minutes',
        second: 'seconds',
        millisecond: 'milliseconds'
    },

    createDate: function(date) {
        var src = date;
        if (Ember.typeOf(date) === 'array') {
            src = Date.UTC.apply({}, date);
        }
        return moment(src).utc().toDate();
    },

    getNextDay: function(day) {
        return moment(day).clone().add('days', 1).toDate();
    },

    getDateArray: function() {
        var date = moment(arguments[0]).utc();
        var a = [];
        for (var i = 1; i < arguments.length; i++) {
            var dateStr = IRC.dateStrDict[arguments[i]];
            if (!dateStr) {
                a.push(null);
            } else {
                var value = date[dateStr]();
                a.push(value);
            }
        }
        return a;
    },

    loadDate: function(event) {
        var day = event.context;
        var date = Ember.getPath(day, 'date');
        var dataSource = Ember.getPath(this, 'dataSource');
        if (dataSource) {
            dataSource.loadDay(date);
        }
    }

});