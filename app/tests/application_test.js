require('irc/core');

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

module('IRC#createDate');
test('has a method createDate', 1,
function() {
    ok(IRC.createDate, 'method exists');
});

test('returnes the UTC version of passed Date object', 4,
function() {
    var date = new Date('2012-05-25T13:32:18+02:00');
    var utcDate = new Date('2012-05-25T11:32:18+00:00');

    var createdDate = IRC.createDate(date);
    ok(createdDate, 'returned date exists');
    ok(createdDate instanceof Date, 'created object is an instance of Date');
    equal(utcDate.getTime(), createdDate.getTime(), 'created date is equal to the source date');
    equal(createdDate.getUTCHours(), 11, 'created date is in timezone 0');
});

test('works with string argument', 4,
function() {
    var dateStr = '2012-05-25T13:32:18+02:00';

    var createdDate = IRC.createDate(dateStr);
    ok(createdDate, 'returned object exists');
    ok(createdDate instanceof Date, 'returned object is an instance of Date');
    equal(createdDate.getTime(), new Date(dateStr).getTime(), 'created date is equal to the source date');
    equal(createdDate.getUTCHours(), 11, 'created date is in timezone 0');
});

test('creates a Date with current time if no argument is passed', 4,
function() {
    var now = new Date();
    var createdDate = IRC.createDate();
    ok(createdDate, 'returned object exists');
    ok(createdDate instanceof Date, 'returned object is an instance of Date');
    ok(Math.abs(now.getTime() - createdDate.getTime()) <= 1000, 'created date is the current date');
    equal(createdDate.getUTCHours(), now.getUTCHours(), 'created date is in timezone 0');
});

test('returns the Date in UTC time', 3,
function() {
    var now = new Date('2012-05-25T13:32:18+02:00');
    var createdDate = IRC.createDate(now);
    ok(createdDate, 'returned object exists');
    ok(createdDate instanceof Date, 'returned object is an instance of Date');
    equal(createdDate.getUTCHours(), 11, 'created date is in timezone 0');
});

module('IRC#getNextDay');

test('returns the next day',
function() {
    var date = new Date('2012-05-05T12:00:00+00:00');
    equal(date.getDate(), 5, 'precond - date is the 5th');

    var nextDay = IRC.getNextDay(date);

    equal(date.getDate(), 5, 'date is not modified');
    ok(nextDay, 'returned object exists');
    equal(nextDay.getDate(), 6, 'next day is the 6th');
});

module('IRC#getDateArray');

test('method getDateArray exists', 1,
function() {
    ok(IRC.getDateArray, 'exists');
});

test('returns array with specified date properties', 6,
function() {
    var date = IRC.createDate('2012-12-21T12:34:56.789Z');
    deepEqual(IRC.getDateArray(date, 'year'), [2012], 'single property work');
    deepEqual(IRC.getDateArray(date, 'year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond'), [2012, 11, 21, 12, 34, 56, 789], 'all properties work');
    deepEqual(IRC.getDateArray(date, 'year', 'year'), [2012, 2012], 'duplicate properties work');
    deepEqual(IRC.getDateArray(date, 'unknown'), [null], 'unknown properties are null in the array');
    deepEqual(IRC.getDateArray(date, 'year', 'unknown', 'day'), [2012, null, 21], 'unknown properties work with valid ones');
    deepEqual(IRC.getDateArray(date, 'month'), [11], 'month is 0-based');
});