var http = require('http');
var httpProxy = require('http-proxy');
var sys = require('util');
var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
    sys.puts(stdout);
}
exec("cd _attachments && bpm preview", puts);

var options = {
    router: {
        'localhost/app': 'localhost:4020',
        'localhost': '127.0.0.1:5984'
    }
};

var proxyServer = httpProxy.createServer(options);
proxyServer.listen(8000);