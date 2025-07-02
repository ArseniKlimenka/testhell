'use strict';

module.exports = function mapping(input, sinkExchange) {

    if (!input.contractNumber) {
        return;
    }

    sinkExchange.validFrom = input.validFrom;

    return {
        input: {
            data: {
                criteria: {
                    contractNumber: input.contractNumber
                }
            }
        }
    };

};
