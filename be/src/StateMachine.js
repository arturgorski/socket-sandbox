const { WARM_UP, RESULTS } = require('./messages');

const friends = require('./friends');

const STATE_WARM_UP = 'warmUp';
const STATE_QUIZ = 'quiz';
const STATE_QUIZ_ENDED = 'quiz_ended';
const WARM_UP_INTERVAL = 1000;
const QUESTION_TIMEOUT_SECONDS = 10;

class StateMachine {
    constructor(io, uc, qp, qc, qr) {
        this.io = io;
        this.usersCollection = uc;
        this.quizParticipants = qp;
        this.warmupTimer = null;
        this.quizController = qc;
        this.quizRank = qr;
    }

    warmup(delaySeconds) {
        this.quizRank.reset();
        this.quizParticipants.reset();
        this.quizController.reset();

        this.currentState = STATE_WARM_UP;
        const startTime = Math.round(new Date().getTime() / 1000) + parseInt(delaySeconds, 10);

        clearInterval(this.warmupTimer);

        this.warmupTimer = setInterval(() => {
            console.log('Send warm up message with delay: ', delaySeconds);

            const currentTime = Math.round(new Date().getTime() / 1000);
            const timeLeft = currentTime - startTime;

            if (timeLeft === 0) {
                this.quiz();
            }

            // console.log(timeLeft);
            Object.keys(this.usersCollection.users)
                .forEach((userId) => {
                    let friendsList = [];

                    if (this.usersCollection.hasFriends(userId)) {
                        const usersFriends = friends.filter(friendId => friendId !== userId);
                        friendsList = usersFriends
                            .filter(friendId => this.quizParticipants.isParticipant(friendId))
                            .map(friendId => ({
                                id: friendId,
                                name: this.usersCollection.getUserById(friendId).userName
                            }))

                    }

                    this.io.to(userId).emit(WARM_UP, {
                        timeLeft,
                        playersCount: this.quizParticipants.count(),
                        name: 'Fuck yeah!',
                        id: '123',
                        friends: friendsList,
                    });
                });
        }, WARM_UP_INTERVAL)
    }

    quiz() {
        if (this.currentState === STATE_WARM_UP) {
            this.currentState = STATE_QUIZ;

            this.quizController.start(QUESTION_TIMEOUT_SECONDS, () => {
                clearInterval(this.warmupTimer);
                this.currentState = STATE_QUIZ_ENDED;
                const results = this.quizRank.getResults();

                console.log('Quiz has ended');
                console.log('Results: ', results);

                Object.keys(this.quizParticipants.participants)
                    .forEach(userId => {
                        const customizedResults = results.map(userResult => Object.assign(
                            {
                                isFriend: this.usersCollection.hasFriends(userId) && this.usersCollection.hasFriends(userResult.id),
                            },
                            userResult
                        ));

                        this.io.to(userId).emit(RESULTS, { users: customizedResults });

                        console.log('Personalised results for user with Id: ', userId, customizedResults);
                    })
            });
        }
    }

}

module.exports = StateMachine;
