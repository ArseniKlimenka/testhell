'use strict';

module.exports = function mapping(input, sinkExchange) {

    if (!input.contractNumber) {
        return;
    }

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
