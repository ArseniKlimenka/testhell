module.exports = function aggregate(input) {
    const batchSize = 10;

    if (input) {
        return Math.floor(input.$recordCount / batchSize);
    }

    return 0;
};
