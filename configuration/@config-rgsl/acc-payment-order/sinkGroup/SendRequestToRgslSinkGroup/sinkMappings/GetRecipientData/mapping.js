'use strict';

module.exports = function mapping(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    partyCode: input.body.recipientInformation.partyCodeName,
                }
            }
        }
    };
};
