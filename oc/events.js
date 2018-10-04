var http = require('http');

// ceci est identique au bloc suivant
// var server = http.createServer();
// server.on('request', function(req, res) {
//     res.writeHead(200);
//     res.end('Salut tout le monde !');
// });
var server = http.createServer(function(req, res) {
    res.writeHead(200);
    res.end('Salut tout le monde !');
});

// On écoute l'évènement close
server.on('close', function() {
    console.log('Bye bye !');
})

// Démarre le serveur
server.listen(8080);

// Arrête le serveur. Déclenche l'évènement close
server.close();
