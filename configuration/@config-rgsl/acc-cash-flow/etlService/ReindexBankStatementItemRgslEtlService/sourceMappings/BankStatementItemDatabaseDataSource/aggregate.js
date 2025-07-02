module.exports = function aggregate(input) {
    if (input) {
        const batchSize = 100;
        return Math.floor(input.$recordCount / batchSize);
    }

    return 0;
};
