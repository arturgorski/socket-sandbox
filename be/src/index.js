const io = require('socket.io')(80);
const UsersCollection = require('./UsersCollection');

const uc = new UsersCollection();

io.on('connection', function (socket) {
    console.log(socket.id);
    const userId = socket.handshake.query.userId;
    const connectinId = socket.id;

    uc.connect(userId, connectinId, 'name');
    socket.join(userId);

    socket.on('disconnect', () => {
        uc.disconnect(userId, connectinId);
    });

    // io.in(userId).emit('message', 'New user connected: ' + userId);
    // console.log('>>> User connected with user id:', userId);


    socket.on('setUserId', function (data) {
        const id = socket.conn.id;
        // createUsrEntry(users, data, id);
        // console.log("set user id", data, socket.conn.id);
        //
        // setTimeout(() => {
        //     console.log('send custom data');
        //     // socket.emit('message', data + ' ' + data);
        //     io.to(id).emit('message', 'some event' + data);
        //     io.emit('message', 'an event sent to all connected clients');
        // }, 100);
    });

    socket.on('answer', function (data, callback) {
        console.log('Got answer: ', data);
        callback('yay');
    });

    socket.on('ack', function (data) {
        console.log('Got ack: ', data);
    });
});


var restify = require('restify');

function respond(req, res, next) {
    io.emit('message', req.params.name);
    res.send('ok');
    next();
}

function respond2(req, res, next) {
    io.to(req.params.name).emit('message', req.params.message, function (responseData) {
        console.log('Callback called with data:', responseData);
    });

    res.send('ok');
    next();
}

var server = restify.createServer();
server.get('/ping/:name', respond);
server.get('/ping/:name/:message', respond2);

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});


// const createUsrEntry = (usersList, userId, connId) => {
//     usersList[connId] = userId;
// };
//
// const getUserConnectionId = (usersList, userId) => {
//     for (let prop in usersList) {
//         if (usersList[prop] === userId) {
//             return prop;
//         }
//     }
// };
