module('IRC.messagesController', {
    setup: function() {
        IRC.messagesController.set('content', []);
    }
});

test('exists',
function() {
    ok(IRC.messagesController, 'it exists');
    ok(Ember.ArrayProxy.detectInstance(IRC.messagesController), 'is an instance of Ember.ArrayProxy');
});

test('add new message',
function() {
    ok(IRC.messagesController.addMessage, 'has a method addMessage');
    var message = {
        date: '2012-12-21T12:34:56.789Z',
        text: 'test message',
        user: {
            name: 'username'
        }
    };

    IRC.messagesController.addMessage(message);
    equals(IRC.messagesController.get('length'), 1, 'addMessage adds message to content');

    var addedMessage = IRC.messagesController.objectAt(0);
    ok(addedMessage);

    var addedDate = addedMessage.get('date');
    ok(Ember.DateTime.detectInstance(addedDate), 'date of the message is a Ember.DateTime');
    var date = Ember.DateTime.create({
        year: 2012,
        month: 12,
        day: 21,
        hour: 12,
        minute: 34,
        second: 56,
        millisecond: 789,
        timezone: 0
    });
    equals(Ember.DateTime.compareDate(date, addedDate), 0, 'added date is the correct Ember.DateTime object');
    ok(date.isEqual(addedDate), 'added date is the correct Ember.DateTime object');
    equals(addedMessage.get('username'), message.user.name, 'addedMessage has the username');
    equals(addedMessage.get('text'), message.text, 'addedMessage has the text');
});

module('IRC.daysController', {
    setup: function() {
        IRC.daysController.set('content', []);
    }
});

test('exists',
function() {
    ok(IRC.daysController, 'it exists');
    ok(Ember.ArrayProxy.detectInstance(IRC.daysController), 'is an instance of Ember.ArrayProxy');
});

test('add new day',
function() {
    ok(IRC.daysController.addDay, 'it has a method addDay');

    var day = {
        date: '2012-12-21T12:34:56.789Z',
        count: 123
    };

    IRC.daysController.addDay(day);
    equals(IRC.daysController.get('length'), 1, 'added day');

    var addedDay = IRC.daysController.objectAt('0');
    ok(addedDay);

	equals(addedDay.get('count'), 123, 'count of added day is the same as original');
});