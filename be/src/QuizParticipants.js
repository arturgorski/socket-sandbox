const _ = require('lodash');

class QuizParticipants {
    constructor() {
        this.participants = {};
    }

    reset() {
        this.participants = {};
    }

    join(userId) {
        this.participants[userId] = true;
    }

    leave(userId) {
        delete this.participants[userId];
    }

    isParticipant(userId) {
        return !!this.participants[userId];
    }

    count() {
        return _.size(this.participants);
    }
}

module.exports = QuizParticipants;
