module.exports = function mapping(input, sinkExchange) {
    const payments = sinkExchange.resolveContext('payments');

    return {
        bankStatementItems: payments,
    };
};
