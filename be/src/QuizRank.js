class QuizRank {
    constructor() {
        this.results = {};
    }

    reset() {
        this.results = {};
    }

    getResults() {
        const results = Object.keys(this.results)
            .map(userId => ({
                id: userId,
                name: this.results[userId].userName,
                points: this.results[userId].points,
                totalTime: this.results[userId].totalTime,
            }));

        return results.sort((a, b) => a.points !== b.points ? b.points - a.points : a.totalTime - b.totalTime);
    }

    validAnswer(userId, userName, points, timeMs) {
        if (!this.results[userId]) {
            this.results[userId] = {
                userName,
                points: 0,
                totalTime: 0,
            }
        }

        this.results[userId].totalTime += timeMs;
        this.results[userId].points += points;
    }
}

module.exports = QuizRank;
