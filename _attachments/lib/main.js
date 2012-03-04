require('./core');
require('./controller');
require('./templates');
require('./couchdb_datasource');

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
    IRC.dataSource.loadDay(IRC.createDateTime().adjust({
        hour: 0,
        timezone: 0
    }));
    IRC.dataSource.loadDays();
});