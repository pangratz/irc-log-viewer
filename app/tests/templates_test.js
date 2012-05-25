/*jshint sub: true */
require('irc/core');
require('irc/templates');

module('IRC templates', {
    setup: function() {
        // clear all templates
        Ember.TEMPLATES = [];
    }
});

test('tmpl adds the template to Ember.TEMPLATES', 3,
function() {
    var testTemplateName = 'test_template';
    ok(!Ember.TEMPLATES['test_template'], 'precond: template not loaded');
    var main_page = 'test_template'.tmpl();
    equal(main_page, 'test_template');
    ok(Ember.TEMPLATES['test_template'], 'template is available');
});

module('Handlebars Helper');

test('Handlebars format helper works with default format', 1,
function() {
    var view = Ember.View.create({
        elementId: 'dateView',
        template: Ember.Handlebars.compile('{{format date}}'),
        date: IRC.createDate()
    });

    Ember.run(function() {
        view.appendTo('#qunit-fixture');
    });

    ok($('#dateView').html().trim());
});


test('Handlebars format helper works with specified format', 1,
function() {
    var view = Ember.View.create({
        elementId: 'dateView',
        template: Ember.Handlebars.compile('{{format date "YYYY-MM-DD"}}'),
        date: IRC.createDate('2012-12-21T12:00:00')
    });

    Ember.run(function() {
        view.appendTo('#qunit-fixture');
    });

    equal($('#dateView').html().trim(), '2012-12-21');
});

test('Handlebars parse helper', 1,
function() {
    var view = Ember.View.create({
        elementId: 'formatView',
        template: Ember.Handlebars.compile('{{parse text}}'),
        text: 'hello http://www.google.com you'
    });

    Ember.run(function() {
        view.appendTo('#qunit-fixture');
    });

    equal($('#formatView').html().trim(), 'hello <a href="http://www.google.com">http://www.google.com</a> you', 'link is replaced');
});

module('String.prototype.parseURL');

test('wraps urls in anchor tags', 6,
function() {
    var testAnchor = function(url, description) {
        equal(url.parseURL(), '<a href="' + url + '">' + url + '</a>', description);
    };
    testAnchor('https://emberjs.com', 'recognizes https domains');
    testAnchor('http://emberjs.com', 'recognizes http domains');
    testAnchor('http://emberjs.com/documentation', 'recognizes urls without specific file');
    testAnchor('http://emberjs.com/documentation/index.html', 'recognizes urls with file');
    testAnchor('https://github.com/emberjs/emberjs.github.com', 'recognizes urls within urls');
    testAnchor('http://emberjs.com/documentation/index.html#views', 'recognizes urls with hash tag');
});