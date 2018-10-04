var http = require('http');

var server = http.createServer(function(req, res) {
    res.writeHead(200);
    res.end('Salut tout le monde !');
});

// création d'un objet jeu sur base de EventEmitter
var EventEmitter = require('events').EventEmitter;
var jeu = new EventEmitter();

// écoute
jeu.on('gameover', function(message) {
    console.log(message);
});

// événement
jeu.emit('gameover', 'Vous avez perdu !');

// Démarre le serveur
server.listen(8080);
