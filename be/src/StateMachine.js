const { WARM_UP } = require('./messages');

const STATE_WARM_UP = 'warmUp';

class StateMachine {
    constructor(io, uc, qp) {
        this.io = io;
        this.usersCollection = uc;
        this.quizParticipants = qp;
        this.warmupTimer = null;
    }

    warmup(delaySeconds) {
        this.currentState = STATE_WARM_UP;
        const startTime = Math.round(new Date().getTime() / 1000) + parseInt(delaySeconds, 10);

        clearInterval(this.warmupTimer);

        this.warmupTimer = setInterval(() => {
            const currentTime = Math.round(new Date().getTime() / 1000);
            const timeLeft = Math.max(startTime - currentTime, 0);

            // console.log(timeLeft);
            Object.keys(this.usersCollection.users).forEach((userId) => {
                this.io.to(userId).emit(WARM_UP, {
                    timeLeft,
                    playersCount: this.quizParticipants.count(),
                    name: 'Fuck yeah!',
                    id: '123',
                    friends: [],
                });
            });
        }, 200)
    }


}

module.exports = StateMachine;
