var http = require('http');

var server = http.createServer(function(req, res) {
    res.writeHead(200);
    res.end('Console logs');
});

var monmodule = require('./mymodules/hellogoodbye');

monmodule.direBonjour();
monmodule.direByeBye();

server.listen(8080);
