var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res) {

    // récupère l'url (sans les params)
    var page = url.parse(req.url).pathname;

    // récupère les params (après on peut les appeler avec params['cacaboudin'])
    var querystring = require('querystring');
    var params = querystring.parse(url.parse(req.url).query);

    console.log(page);
    console.log(params);

    res.writeHead(200, {"Content-Type": "text/html"});

    // les res.write('') écrivent la page dans l'ordre
    res.write('<!DOCTYPE html><html>'+
    '<head>'+
    '<meta charset="utf-8" />'+
    '<title>node.js nom de djeu!</title>'+
    '</head>'+
    '<body>');

    res.write('Bien le bonjour ');
    if ('prenom' in params && 'nom' in params) {
        res.write(params['prenom'] + ' ' + params['nom']);
    }
    else {
        res.write('Vous devez bien avoir un prénom et un nom, non ?');
    }

    res.write('</body></html>');

    // terminer avec res.end()
    res.end();
});

server.listen(8080);
