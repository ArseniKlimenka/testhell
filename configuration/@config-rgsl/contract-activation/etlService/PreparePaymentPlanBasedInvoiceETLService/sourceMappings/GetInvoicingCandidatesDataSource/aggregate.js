module.exports = function aggregate(input) {
    if (input) {
        const BatchSize = 5;
        return Math.floor(input.$recordCount / BatchSize);
    }

    return 0;
};
