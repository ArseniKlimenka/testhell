module.exports = function mapping(input, sinkExchange) {
    const partyCodes = sinkExchange.resolveContext('partyCodes');

    return {
        input: {
            data: {
                criteria: {
                    partyCodes: partyCodes
                }
            }
        }
    };
};
