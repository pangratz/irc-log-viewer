IRC.set('MessagesView', Ember.View.create({
    templateName: 'messages'.tmpl(),
    messagesBinding: 'IRC.messagesController'
}));

IRC.set('DaysView', Ember.View.create({
    templateName: 'days'.tmpl(),
    daysBinding: 'IRC.daysController'
}));