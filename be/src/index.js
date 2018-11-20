const io = require('socket.io')(80);
const restify = require('restify');

const UsersCollection = require('./UsersCollection');
const QuizParticipants = require('./QuizParticipants');
const StateMachine = require('./StateMachine');
const QuizController = require('./QuizController');
const QuizRank = require('./QuizRank');

const users = [
    'Artur',
    'Marcin',
    'Jadwiga',
    'Jakub',
    'Gabrysia',
    'Adrian',
    'Jarosław',
    'Zenon',
    'Ryszard',
    'Ryszarda'
];

const uc = new UsersCollection();
const qp = new QuizParticipants();
const qc = new QuizController(io);
const sm = new StateMachine(io, uc, qp, qc);
const qr = new QuizRank();

let index = 0;

io.on('connection', function (socket) {
    console.log('User connected:', socket.id, socket.handshake.query);
    const { userId } = socket.handshake.query;
    const userName = users[index++];
    const connectionId = socket.id;

    uc.connect(userId, connectionId, userName);
    socket.join(userId);

    socket.on('disconnect', () => {
        console.log('User disconnected: ', userId);

        uc.disconnect(userId, connectionId);
        if (!uc.isConnected(userId)) {
            qp.leave(userId);
        }
    });

    socket.on('join', () => {
        qp.join(userId);
    });

    socket.on('answer', (data) => {
        console.log('Got answer: ', data);
        qr.validAnswer(userId, userName, 1, data.answeredTime);
        console.log(qr.getResults());
    })
});

const server = restify.createServer();
server.get('/warmup/:delay', (req, res, next) => {
    console.log('Set to warmup: ', req.params);
    sm.warmup(req.params.delay || 60);

    res.send('ok');
    next();
});

server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
});


// io.in(userId).emit('message', 'New user connected: ' + userId);
// console.log('>>> User connected with user id:', userId);
//
//
// socket.on('setUserId', function (data) {
//     const id = socket.conn.id;
//     // createUsrEntry(users, data, id);
//     // console.log("set user id", data, socket.conn.id);
//     //
//     // setTimeout(() => {
//     //     console.log('send custom data');
//     //     // socket.emit('message', data + ' ' + data);
//     //     io.to(id).emit('message', 'some event' + data);
//     //     io.emit('message', 'an event sent to all connected clients');
//     // }, 100);
// });
//
// socket.on('answer', function (data, callback) {
//     console.log('Got answer: ', data);
//     callback('yay');
// });
//
// socket.on('ack', function (data) {
//     console.log('Got ack: ', data);
// });

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
