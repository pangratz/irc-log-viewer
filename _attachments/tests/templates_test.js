/*jshint sub: true */
module('IRC templates', {
    setup: function() {
        // clear all templates
        Ember.TEMPLATES = [];
    }
});

test('tmpl adds the template to Ember.TEMPLATES',
function() {
	var testTemplateName = 'test_template';
    ok(!Ember.TEMPLATES['test_template'], 'precond: template not loaded');
    var main_page = 'test_template'.tmpl();
    equals(main_page, 'test_template');
    ok(Ember.TEMPLATES['test_template'], 'template is available');
});

test('Handlebars format helper works with default format',
function() {
	var view = Ember.View.create({
        elementId: 'dateView',
        template: Ember.Handlebars.compile('{{format date}}'),
        date: Ember.DateTime.create()
    });

    Ember.run(function() {
        view.appendTo('#qunit-fixture');
    });

    ok($('#dateView').html().trim());
});


test('Handlebars format helper works with specified format',
function() {
    var view = Ember.View.create({
        elementId: 'dateView',
        template: Ember.Handlebars.compile('{{format date "%Y-%m-%d"}}'),
        date: Ember.DateTime.create({
            year: 2012,
            month: 12,
            day: 21
        })
    });

    Ember.run(function() {
        view.appendTo('#qunit-fixture');
    });

    equals($('#dateView').html().trim(), '2012-12-21');
});

test('Handlebars parse helper',
function() {
    var view = Ember.View.create({
        elementId: 'formatView',
        template: Ember.Handlebars.compile('{{parse text}}'),
        text: 'hello http://www.google.com you'
    });

    Ember.run(function() {
        view.appendTo('#qunit-fixture');
    });

    equals($('#formatView').html().trim(), 'hello <a href="http://www.google.com">http://www.google.com</a> you', 'link is replaced');
});
