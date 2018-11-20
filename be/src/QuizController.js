const { QUESTION } = require('./messages');

class QuizController {
    constructor(io) {
        this.io = io;
        this.nextQuestion = null;
        this.questions = [{
            question: 'Which team plays league matches at the Veltins Arena stadium?\n',
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
            question: 'In which year, the current Netherlands coach Ronald Koeman won the gold medal of the European Championship together with the Netherland national team?',
            answers: [{
                answer: '1988',
                isCorrect: true,
            }, {
                answer: '1984',
                isCorrect: false,
            }, {
                answer: '1992',
                isCorrect: false,
            }, {
                answer: '1996',
                isCorrect: false,
            }]
        }, {
            question: 'In what position did the current German coach Joachim Loew play in the German national team?\n',
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
                answer: 'He didn’t play in the senior national team',
                isCorrect: true,
            }]
        }, {
            question: 'German national team played 12 times at the European Championships. How many times did she win the gold medal in this tournament?',
            answers: [{
                answer: '1',
                isCorrect: true,
            }, {
                answer: '3',
                isCorrect: false,
            }, {
                answer: '4',
                isCorrect: false,
            }, {
                answer: '7',
                isCorrect: false,
            }]
        }, {
            question: 'In which year, the current Netherlands coach Ronald Koeman won the gold medal of the European Championship together with the Netherland national team?',
            answers: [{
                answer: '1988',
                isCorrect: true,
            }, {
                answer: '1984',
                isCorrect: false,
            }, {
                answer: '1992',
                isCorrect: false,
            }, {
                answer: '1996',
                isCorrect: false,
            }]
        }, {
            question: 'In which year, the current Netherlands coach Ronald Koeman won the gold medal of the European Championship together with the Netherland national team?',
            answers: [{
                answer: '1988',
                isCorrect: true,
            }, {
                answer: '1984',
                isCorrect: false,
            }, {
                answer: '1992',
                isCorrect: false,
            }, {
                answer: '1996',
                isCorrect: false,
            }]
        }]
    }

    start(timePerQuestionSeconds) {
        this.nextQuestion = 0;
        this.next(timePerQuestionSeconds);
    }

    next(timePerQuestionSeconds) {
        const question = this.questions[this.nextQuestion];
        if (!question) {
            return;
        }

        question.number = this.nextQuestion + 1;
        question.total = this.questions.length;
        question.timeForAnswer = timePerQuestionSeconds;

        this.io.emit(QUESTION, question);
        this.nextQuestion++;

        setTimeout(() => {
            this.next(timePerQuestionSeconds);
        }, (timePerQuestionSeconds + 3) * 1000);
    }
}

module.exports = QuizController;
