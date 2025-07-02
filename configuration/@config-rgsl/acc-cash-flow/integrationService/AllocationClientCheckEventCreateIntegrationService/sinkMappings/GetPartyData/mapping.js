'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    partyCode: sinkExchange.holderCode
                }
            }
        }
    };
};
