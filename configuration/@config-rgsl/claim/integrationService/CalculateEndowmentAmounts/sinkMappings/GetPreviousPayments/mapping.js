'use strict';

module.exports = function fetchMapping(input, sinkExchange) {

    const contractNumber = input.body.mainAttributes.contract.number;
    const endowmentNumber = input.endowmentNumber;

    if (!contractNumber || !endowmentNumber) {

        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    contractNumber: contractNumber,
                    currentEndowmentNumber: endowmentNumber
                }
            }
        }
    };
};
