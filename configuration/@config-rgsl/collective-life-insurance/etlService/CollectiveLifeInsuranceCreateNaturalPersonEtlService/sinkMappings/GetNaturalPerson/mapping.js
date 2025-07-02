module.exports = function mapping(lineInput, sinkExchange) {

    const partyCode = sinkExchange.partyCode;
    if (!partyCode) {
        return null;
    }

    return {
        input: {
            data: {
                criteria: {
                    partyCode
                }
            }
        }
    };
};
