/*jshint sub: true */
String.prototype.tmpl = function() {
    if (!Ember.TEMPLATES[this]) {
        Ember.TEMPLATES[this] = require('irc/~templates/' + this);
    }
    return this;
};

String.prototype.parseURL = function() {
    return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&#~\?\/.=]+/g,
    function(url) {
        return url.link(url);
    });
};

Handlebars.registerHelper('format', function(property, format) {
    var dateFormat = Ember.DATETIME_ISO8601;
    if (Ember.typeOf(format) === 'string') {
        dateFormat = format;
    }
    var value = Ember.getPath(this, property);
    if (value && Ember.DateTime.detectInstance(value)) {
        value = value.toFormattedString(dateFormat);
    } else {
        value = undefined;
    }
    return new Handlebars.SafeString(value);
});

Handlebars.registerHelper('parse', function(property) {
    var value = Ember.getPath(this, property);
    value = Handlebars.Utils.escapeExpression(value);
    value = value.parseURL();
    return new Handlebars.SafeString(value);
});