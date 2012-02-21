## irc-log-viewer

This is a viewer for IRC logs which are stored in a CouchDB. It's basically a couchapp using Ember.js. Demo? Here you go: [http://emberjs.iriscouch.com/irc/_design/viewer/index.html](http://emberjs.iriscouch.com/irc/_design/viewer/index.html) (transcript of #emberjs channel)

### Awesome stuff used

- [sexy Ember.js](https://github.com/emberjs/ember.js)
- [sexy BPM](https://github.com/bpm/bpm)
- [sexy CouchDB](http://couchdb.apache.org/)
- [sexy Couchapp](http://couchapp.org/)
- [Twitter's sexy Bootstrap](http://twitter.github.com/bootstrap/)

## Stored IRC messages

The IRC messages saved in the CouchDB have the following format:

```javascript
{
   "user": {
       "id": "123",
       "name": "GOB"
   },
   "text": "Come on!",
   "date": "2012-12-21T12:34:56.789Z"
}
```

One example of filling the CouchDB with the IRC messages would be a [Hubot](https://github.com/github/hubot) configured with the [store-messages-couchdb.coffee](https://github.com/github/hubot-scripts/blob/master/src/scripts/store-messages-couchdb.coffee) script and using an [IRC Adapter](https://github.com/nandub/hubot-irc)

## CouchDB Views

The `messages` view returns all messages, where the key is the date structured as an array with the year as first element, month as second and so forth. This allows you to get messages for a specific period.

## Front end

Inside the `_attachments` folder is the basic front end. It uses Ember.js and BPM as a build system.

## Development

### Prerequisites:
- installed BPM
- installed CouchDB where app can be deployed or use a free hosting service like the excellent [Iris Couch](http://www.iriscouch.com/)
- installed `couchapp` command line tool for easy pushing of the app to a CouchDB, see [installation](http://couchapp.org/page/installing)

### Developing

- Clone this repo, obviously
- Tests are in located in the `_attachments/tests` folder
- Execute `bpm preview` inside `_attachments` to start a development server
- Access [http://localhost:4020/tests.html](http://localhost:4020/tests.html) to execute the tests

### Deploy

- execute `bpm rebuild` inside `_attachments`
- push the Couchapp to your CouchDB; if you have `couchapp` installed, do a `couchapp push http://localhost:5984/irc`
- access the IRC log viewer at `http://localhost:5984/irc/_design/viewer/index.html`