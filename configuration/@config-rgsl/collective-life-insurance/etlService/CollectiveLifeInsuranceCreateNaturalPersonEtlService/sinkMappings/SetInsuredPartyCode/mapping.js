const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(input, sinkExchange) {

    const output = {
        request: {
            id: getValue(input, 'id'),
            partyCode: sinkExchange.partyCode
        }
    };

    return output;
};
