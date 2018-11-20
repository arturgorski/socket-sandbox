const friends = require('./friends');

class UsersCollection {
    constructor() {
        this.users = {};
        this.connectedUsers = 0;
    }

    connect(userId, connectionId, userName) {
        if (!this.users[userId]) {
            this.users[userId] = {
                userName,
                connections: [connectionId]
            };
            this.connectedUsers++;
        } else {
            this.users[userId]['connections'].push(connectionId);
        }
    }

    isConnected(userId) {
        return this.users[userId] !== undefined;
    }

    getUserById(userId) {
        return this.users[userId];
    }

    hasFriends(userId) {
        return friends.includes(userId);
    }

    disconnect(userId, connectionId) {
        if (this.users[userId]['connections'].length > 1) {
            this.users[userId]['connections'] = this.users[userId]['connections']
                .filter(connId => connId !== connectionId);
        } else {
            delete this.users[userId];
            this.connectedUsers--;
        }

    }
}

module.exports = UsersCollection;
