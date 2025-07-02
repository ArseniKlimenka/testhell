module.exports = function mapping(input) {
    return {
        rsdNumber: input.number,
        transactionDate: input.body.createdDate,
    };
};
