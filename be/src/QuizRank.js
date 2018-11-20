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
                userId,
                userName: this.results[userId].userName,
                points: this.results[userId].points,
                totalTimeMs: this.results[userId].totalTimeMs,
            }));

        return results.sort((a, b) => a.points !== b.points ? b.points - a.points : a.totalTimeMs - b.totalTimeMs);
    }

    validAnswer(userId, userName, points, timeMs) {
        if (!this.results[userId]) {
            this.results[userId] = {
                userName,
                points: 0,
                totalTimeMs: 0,
            }
        }

        this.results[userId].totalTimeMs += timeMs;
        this.results[userId].points += points;
    }
}

module.exports = QuizRank;
