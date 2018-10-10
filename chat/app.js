
var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    fs = require('fs');
    io.set('heartbeat timeout', 60000); // Client vers serveur (serveur mort si pas de réponse)
    io.set('heartbeat interval', 25000); // Serveur vers client (client mort si pas de réponse)

var history = [];

// Chargement de la page index.html
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('nouveau_client', function(pseudo) {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        socket.broadcast.emit('nouveau_client', pseudo);
        // console.log(history);
        socket.emit('give_hist', history);
    });

    // On signale aux autres clients quand quelqu'un se déconnecte
    socket.on('disconnect', function (pseudo) {
        if (socket.pseudo != null) {
            socket.broadcast.emit('ciao_client', socket.pseudo);
        }
    });

    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
    socket.on('message', function (message) {
        message = ent.encode(message);
        data = {pseudo: socket.pseudo, message: message};
        history.push(data);
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    });
});

server.listen(8080);
