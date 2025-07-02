module.exports = function mapping({id, number}, sinkExchange) {
    return {
        input: {
            data: {
                criteria: {
                    aggregatedPaymentNumber: number,
                }
            }
        }
    };
};
