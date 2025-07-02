'use strict';

module.exports = function mapping(lineInput, sinkExchange) {

    const output = {
        input: {
            data: {
                criteria: {
                    partyCode: sinkExchange.additionalData.holderCode
                }
            }
        }
    };

    return output;
};
