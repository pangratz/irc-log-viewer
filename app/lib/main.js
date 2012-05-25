require('irc/core');
require('irc/controller');
require('irc/templates');
require('irc/couchdb_datasource');

IRC.daysController = IRC.DaysController.create();
IRC.messagesController = IRC.MessagesController.create();

IRC.dataSource = IRC.CouchDBDataSource.create({
    messagesController: IRC.messagesController,
    daysController: IRC.daysController
});

Ember.View.create({
    templateName: 'messages'.tmpl(),
    messagesBinding: 'IRC.messagesController',
    loadingBinding: 'IRC.messagesController.loading',
    dateBinding: 'IRC.messagesController.date'
}).appendTo('#messages');

Ember.View.create({
    templateName: 'days'.tmpl(),
    daysBinding: 'IRC.daysController',
    loadingBinding: 'IRC.daysController.loading'
}).appendTo('#days');

Ember.run(function() {
    IRC.dataSource.loadDay(IRC.createDate());
    IRC.dataSource.loadDays();
});