require('irc/controller');
var controller;
module('IRC.MessagesController', {
    setup: function() {
        controller = IRC.MessagesController.create({});
    },
    teardown: function() {
        controller = null;
    }
});

test('exists', 1,
function() {
    ok(IRC.MessagesController, 'it exists');
});

test('add new message', 8,
function() {
    ok(controller.addMessage, 'has a method addMessage');
    var message = {
        date: '2012-12-21T12:34:56.789Z',
        text: 'test message',
        user: {
            name: 'username'
        }
    };

    controller.addMessage(message);
    equals(controller.get('length'), 1, 'addMessage adds message to content');

    var addedMessage = controller.objectAt(0);
    ok(addedMessage);

    var addedDate = addedMessage.get('date');
    ok(Ember.DateTime.detectInstance(addedDate), 'date of the message is a Ember.DateTime');
    var date = IRC.createDateTime('2012-12-21T12:34:56.789Z');
    equals(Ember.DateTime.compareDate(date, addedDate), 0, 'added date is the correct Ember.DateTime object');
    ok(date.isEqual(addedDate), 'added date is the correct Ember.DateTime object');
    equals(addedMessage.get('username'), message.user.name, 'addedMessage has the username');
    equals(addedMessage.get('text'), message.text, 'addedMessage has the text');
});

test('clear', 3,
function() {
    ok(controller.clear, 'has a clear method');

    var message = {
        date: '2012-12-21T12:34:56.789Z',
        text: 'test message',
        user: {
            name: 'username'
        }
    };
    controller.addMessage(message);
    ok(controller.get('length') > 0);

    controller.clear();
    equals(controller.get('length'), 0, 'after clear there are no messages in the controller');
});

module('IRC.DaysController', {
    setup: function() {
        controller = IRC.DaysController.create();
    },
    teardown: function() {
        controller = null;
    }
});

test('exists', 1,
function() {
    ok(IRC.DaysController, 'it exists');
});

test('add new day', 5,
function() {
    ok(controller.addDay, 'it has a method addDay');

    var day = {
        date: '2012-12-21T12:34:56.789Z',
        count: 123
    };

    controller.addDay(day);
    equals(controller.get('length'), 1, 'added day');

    var addedDay = controller.objectAt('0');
    ok(addedDay);
    ok(IRC.createDateTime('2012-12-21T12:34:56.789Z').isEqual(addedDay.get('date')), 'added date is equal to original');
    equals(addedDay.get('count'), 123, 'count of added day is the same as original');
});

test('clear', 3,
function() {
    ok(controller.clear, 'has a clear method');

    var day = {
        date: '2012-12-21T12:34:56.789Z',
        count: 123
    };
    controller.addDay(day);
    ok(controller.get('length') > 0);

    controller.clear();
    equals(controller.get('length'), 0, 'after clear there are no days in the controller');
});