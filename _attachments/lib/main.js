require('./core');
require('./controller');
require('./templates');
require('./views');

IRC.MessagesView.appendTo('#messages');
IRC.DaysView.appendTo('#days');

IRC.messagesController.addMessage({
    date: new Date(),
    user: {
        name: 'pangratz'
    },
    text: 'emberjs rulez!'
});

IRC.daysController.addDay({
    date: new Date(),
    count: 123
});
