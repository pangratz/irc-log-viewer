module('IRC');

test('exists', 2,
function() {
    ok(IRC, 'IRC exists');
    ok(Ember.Application.detectInstance(IRC), 'IRC is an instance of Ember.Application');
});

test('has a version', 1,
function() {
    ok(IRC.VERSION, 'version is available');
});

module('IRC#createDateTime');
test('has a method createDateTime', 1,
function() {
    ok(IRC.createDateTime, 'method exists');
});

test('creates an Ember.DateTime object', 3,
function() {
    var date = new Date(2012, 12, 21, 1, 2, 3, 456);

    var createdDate = IRC.createDateTime(date);
    ok(createdDate, 'returned date exists');
    ok(Ember.DateTime.detectInstance(createdDate), 'created object is an instance of Ember.DateTime');
    ok(Ember.DateTime.create(date.getTime()).isEqual(createdDate), 'created date is equal to the source date');
});

test('creates an Ember.DateTime object equal to source date as Ember.DateTime', 1,
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

test('works with string argument', 3,
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

test('creates an Ember.DateTime in timezone 0', 1,
function() {
    var date = new Date(2012, 12, 21, 1, 2, 3, 456);

    var createdDate = IRC.createDateTime(date);
    equals(createdDate.get('timezone'), 0, 'created date is in timezone 0');
});

test('creates an Ember.DateTime with current time if no argument is passed', 3,
function() {
    var createdDate = IRC.createDateTime();
    ok(createdDate, 'returned object exists');
    ok(Ember.DateTime.detectInstance(createdDate), 'returned object is an instance of Ember.DateTime');
    equals(createdDate.get('timezone'), 0, 'created date is in timezone 0');
});

test('returns the same object in timezone 0 when an Ember.DateTime is passed', 4,
function() {
    var now = IRC.createDateTime();
    var createdDate = IRC.createDateTime(now);
    ok(createdDate, 'returned object exists');
    ok(Ember.DateTime.detectInstance(createdDate), 'returned object is an instance of Ember.DateTime');
    equals(Ember.DateTime.compareDate(now, createdDate), 0, 'returned object is the same as the input object');
    equals(createdDate.get('timezone'), 0, 'created date is in timezone 0');
});

module('IRC#getDateArray');

test('method getDateArray exists', 1,
function() {
    ok(IRC.getDateArray, 'exists');
});

test('returns array with specified date properties', 5,
function() {
    var date = IRC.createDateTime('2012-12-21T12:34:56.789Z');
    deepEqual(IRC.getDateArray(date, 'year'), [2012], 'single property work');
    deepEqual(IRC.getDateArray(date, 'year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'), [2012, 12, 21, 12, 34, 56, 789], 'all properties work');
    deepEqual(IRC.getDateArray(date, 'year', 'year'), [2012, 2012], 'duplicate properties work');
    deepEqual(IRC.getDateArray(date, 'unknown'), [null], 'unknown properties are null in the array');
    deepEqual(IRC.getDateArray(date, 'year', 'unknown', 'day'), [2012, null, 21], 'unknown properties work with valid ones');
});