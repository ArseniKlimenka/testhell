'use strict';

module.exports = function mapping(input, sinkExchange) {

    sinkExchange.mapContext('serviceInput', input);

    return {
        input: {
            data: {
                criteria: {
                    masterPartyCode: input.masterPartyCode,
                    duplicatePartyCode: input.duplicatePartyCode
                }
            }
        }
    };
};
