IRC.set('MessagesView', Ember.View.create({
    templateName: 'messages'.tmpl(),
    messagesBinding: 'IRC.messagesController',
    loadingBinding: 'IRC.messagesController.loading',
    dateBinding: 'IRC.messagesController.date'
}));

IRC.set('DaysView', Ember.View.create({
    templateName: 'days'.tmpl(),
    daysBinding: 'IRC.daysController',
    loadingBinding: 'IRC.daysController.loading'
}));