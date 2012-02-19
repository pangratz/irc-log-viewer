require('ember');

/* YES and NO globals needed in datetime */
window.YES = true;
window.NO = false;
require('./datetime');

IRC = Ember.Application.create({
    VERSION: '0.0.1-snapshot',

    createDateTime: function(date) {
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
            a.push(date.get( arguments[i] ));
        }
        return a;
    }
});