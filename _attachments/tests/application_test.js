module('IRC');

test('exists',
function() {
    ok(IRC, 'IRC exists');
    ok(Ember.Application.detectInstance(IRC), 'IRC is an instance of Ember.Application');
});

test('has a version',
function() {
    ok(IRC.VERSION, 'version is available');
});

module('IRC#createDateTime');
test('has a method createDateTime',
function() {
    ok(IRC.createDateTime, 'method exists');
});

test('creates an Ember.DateTime object',
function() {
    var date = new Date(2012, 12, 21, 1, 2, 3, 456);

    var createdDate = IRC.createDateTime(date);
    ok(createdDate, 'returned date exists');
    ok(Ember.DateTime.detectInstance(createdDate), 'created object is an instance of Ember.DateTime');
    ok(Ember.DateTime.create(date.getTime()).isEqual(createdDate), 'created date is equal to the source date');
});

test('creates an Ember.DateTime object equal to source date as Ember.DateTime',
function() {
    var date = new Date(2012, 12, 21, 1, 2, 3, 456);

    var createdDate = IRC.createDateTime(date);

    var dateTime = Ember.DateTime.create({
        year: 2012,
        month: 12,
        day: 21,
        hour: 1,
        minute: 2,
        second: 3,
        millisecond: 456,
        timezone: 0
    });
    ok(Ember.DateTime.compareDate(dateTime, createdDate), 0, 'created date is equal to the source date in DateTime format');
});

test('works with string argument',
function() {
    var dateStr = '2012-12-21T12:34:56.789Z';

    var createdDate = IRC.createDateTime(dateStr);
    ok(createdDate, 'returned object exists');
    ok(Ember.DateTime.detectInstance(createdDate), 'returned object is an instance of Ember.DateTime');
    var dateTime = Ember.DateTime.create({
        year: 2012,
        month: 12,
        day: 21,
        hour: 1,
        minute: 2,
        second: 3,
        millisecond: 456,
        timezone: 0
    });
    equals(Ember.DateTime.compareDate(dateTime, createdDate), 0, 'created date is equal to the source date in DateTime format');
});

test('creates an Ember.DateTime in timezone 0',
function() {
    var date = new Date(2012, 12, 21, 1, 2, 3, 456);

    var createdDate = IRC.createDateTime(date);
    equals(createdDate.get('timezone'), 0, 'created date is in timezone 0');
});

test('creates an Ember.DateTime with current time if no argument is passed',
function() {
    var createdDate = IRC.createDateTime();
    ok(createdDate, 'returned object exists');
    ok(Ember.DateTime.detectInstance(createdDate), 'returned object is an instance of Ember.DateTime');
    equals(createdDate.get('timezone'), 0, 'created date is in timezone 0');
});


module('IRC#getDateArray');

test('method getDateArray exists',
function() {
    ok(IRC.getDateArray, 'exists');
});

test('returns array with specified date properties',
function() {
    var date = IRC.createDateTime('2012-12-21T12:34:56.789Z');
    deepEqual(IRC.getDateArray(date, 'year'), [2012], 'single property work');
    deepEqual(IRC.getDateArray(date, 'year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'), [2012, 12, 21, 12, 34, 56, 789], 'all properties work');
    deepEqual(IRC.getDateArray(date, 'year', 'year'), [2012, 2012], 'duplicate properties work');
    deepEqual(IRC.getDateArray(date, 'unknown'), [null], 'unknown properties are null in the array');
    deepEqual(IRC.getDateArray(date, 'year', 'unknown', 'day'), [2012, null, 21], 'unknown properties work with valid ones');
});