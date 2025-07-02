'use strict';

module.exports = function mapping(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    referenceNumber: input.endowmentNumber,
                    isManual: false,
                    isCreatedFromNetting: false
                }
            }
        }
    };
};
