const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function mapping(lineInput, sinkExchange) {

    const partyCode = sinkExchange.holder.partyData.partyCode;
    if (!partyCode) { return undefined; }

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
