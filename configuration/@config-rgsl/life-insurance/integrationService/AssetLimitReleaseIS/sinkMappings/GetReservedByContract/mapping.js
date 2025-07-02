'use strict';

module.exports = function fetchMapping(sinkInput, sinkExchange) {

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
