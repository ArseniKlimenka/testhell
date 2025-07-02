'use strict';

module.exports = function mapping(input, sinkExchange) {

    const partyCode = input.body?.policyHolder.partyData.partyCode;

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
