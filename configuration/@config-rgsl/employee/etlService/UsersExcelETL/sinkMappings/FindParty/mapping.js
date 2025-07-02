module.exports = function mapping(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    partyCode: sinkExchange.partyCode
                }
            }
        }
    };
};

