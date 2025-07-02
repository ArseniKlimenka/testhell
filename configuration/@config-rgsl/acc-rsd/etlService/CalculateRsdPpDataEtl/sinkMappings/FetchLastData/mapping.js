module.exports = function mapping(input, sinkExchange) {

    return input.dates.map(_ => ({
        input: {
            data: {
                criteria: {
                    contractNumber: input.contractNumber,
                }
            }
        }
    }));
};
