'use strict';

module.exports = function mapping(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    deduplNumber: input.masterPartyCode,
                    partyCode: input.duplicatePartyCode
                }
            }
        }
    };

};
