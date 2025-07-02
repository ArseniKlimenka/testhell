'use strict';

module.exports = function fetchMapping(sinkInput, sinkExchange) {

    if (sinkExchange.reservedByContract == 0) {

        return null;
    }

    const contractNumber = sinkInput.contractNumber;

    return {
        input: {
            data: {
                criteria: {
                    contractNumber: contractNumber
                }
            }
        }
    };
};
