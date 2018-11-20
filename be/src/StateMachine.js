const { WARM_UP } = require('./messages');

const STATE_WARM_UP = 'warmUp';
const STATE_QUIZ = 'quiz';
const WARM_UP_INTERVAL = 200;
const QUESTION_TIMEOUT_SECONDS = 10;

class StateMachine {
    constructor(io, uc, qp, qc) {
        this.io = io;
        this.usersCollection = uc;
        this.quizParticipants = qp;
        this.warmupTimer = null;
        this.quizController = qc;
    }

    warmup(delaySeconds) {
        this.currentState = STATE_WARM_UP;
        const startTime = Math.round(new Date().getTime() / 1000) + parseInt(delaySeconds, 10);

        clearInterval(this.warmupTimer);

        this.warmupTimer = setInterval(() => {
            const currentTime = Math.round(new Date().getTime() / 1000);
            const timeLeft = currentTime - startTime;

            if (timeLeft === 0) {
                this.quiz();
            }

            // console.log(timeLeft);
            Object.keys(this.usersCollection.users).forEach((userId) => {
                if (!this.quizParticipants.participants[userId]) {
                    this.io.to(userId).emit(WARM_UP, {
                        timeLeft,
                        playersCount: this.quizParticipants.count(),
                        name: 'Fuck yeah!',
                        id: '123',
                        friends: [],
                    });
                }
            });
        }, WARM_UP_INTERVAL)
    }

    quiz() {
        if (this.currentState === WARM_UP) {
            this.currentState = STATE_QUIZ;
            this.quizController.start(QUESTION_TIMEOUT_SECONDS);
        }
    }

}

module.exports = StateMachine;
