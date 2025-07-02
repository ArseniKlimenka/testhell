const partyConstants = require('@config-rgsl/party/lib/partyConstantsImpl');

module.exports = function mapping(input, sinkExchange) {

    return {
        input: {
            data: {
                entityTypeCodeName: partyConstants.partyType.Party,
                businessIdentifier: sinkExchange.party_code
            }
        }
    };
};
