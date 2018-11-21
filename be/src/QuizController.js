const { QUESTION } = require('./messages');

class QuizController {
    constructor(io, qp) {
        this.io = io;
        this.quizParticipants = qp;
        this.nextQuestion = null;
        this.questions = [{
            question: 'Which team plays their home games at Veltins Arena?',
            answers: [{
                answer: 'FC Schalke 04',
                isCorrect: true,
            }, {
                answer: 'Eintracht Frankfurt',
                isCorrect: false,
            }, {
                answer: 'Bayern 04 Leverkusen',
                isCorrect: false,
            }, {
                answer: 'VfL Wolfsburg',
                isCorrect: false,
            }]
        }, {
            question: 'Which year did the Netherlands coach Ronald Koeman win a gold medal at the European Championship?',
            answers: [{
                answer: '1984',
                isCorrect: false,
            }, {
                answer: '1988',
                isCorrect: true,
            }, {
                answer: '1992',
                isCorrect: false,
            }, {
                answer: '1996',
                isCorrect: false,
            }]
        }, {
            question: 'Which position did the German coach Joachim Loew play at in the German national team?',
            answers: [{
                answer: 'Defender',
                isCorrect: false,
            }, {
                answer: 'Midfielder',
                isCorrect: false,
            }, {
                answer: 'Striker',
                isCorrect: false,
            }, {
                answer: 'He never played for the senior national team',
                isCorrect: true,
            }]
        }, {
            question: 'The German national team played 12 times at the European Championships. How many times did they win a gold medal in this tournament?',
            answers: [{
                answer: '1',
                isCorrect: false,
            }, {
                answer: '3',
                isCorrect: true,
            }, {
                answer: '4',
                isCorrect: false,
            }, {
                answer: '7',
                isCorrect: false,
            }]
        }, /* {
            question: 'How is the Netherlands national team usually referred to as?',
            answers: [{
                answer: 'Oranje',
                isCorrect: true,
            }, {
                answer: 'Gell',
                isCorrect: false,
            }, {
                answer: 'Blauw',
                isCorrect: false,
            }, {
                answer: 'Groen',
                isCorrect: false,
            }]
        }, {
            question: 'The Germany national team played with the Netherlands team in the European Championships 5 times. How many times did Germany win?',
            answers: [{
                answer: '1',
                isCorrect: false,
            }, {
                answer: '2',
                isCorrect: true,
            }, {
                answer: '3',
                isCorrect: false,
            }, {
                answer: '5',
                isCorrect: false,
            }]
        }*/
        ]
    }

    reset() {
        clearTimeout(this.timer);
    }

    start(timePerQuestionSeconds, onQuizEnd) {
        this.nextQuestion = 0;
        this.next(timePerQuestionSeconds, onQuizEnd);
    }

    next(timePerQuestionSeconds, onQuizEnd) {
        const question = this.questions[this.nextQuestion];
        if (!question) {
            onQuizEnd();
            return;
        }

        question.number = this.nextQuestion + 1;
        question.total = this.questions.length;
        question.timeForAnswer = timePerQuestionSeconds;

        console.log('Sending question with Id: ', this.nextQuestion);
        console.log('Question data: ', question);

        Object.keys(this.quizParticipants.participants).forEach(userId => {
            this.io.to(userId).emit(QUESTION, question);
        });

        this.nextQuestion++;

        this.timer = setTimeout(() => {
            this.next(timePerQuestionSeconds, onQuizEnd);
        }, (timePerQuestionSeconds + 1) * 1000);
    }
}

module.exports = QuizController;
