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
        }, /*{
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
        }, {
            question: 'How else do they call the Netherlands team?',
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
            question: 'Germany\'s national team met with the Netherlands team in the European Championships 5 times. How many times won?',
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

        this.io.emit(QUESTION, question);
        this.nextQuestion++;

        setTimeout(() => {
            this.next(timePerQuestionSeconds, onQuizEnd);
        }, (timePerQuestionSeconds + 1) * 1000);
    }
}

module.exports = QuizController;
