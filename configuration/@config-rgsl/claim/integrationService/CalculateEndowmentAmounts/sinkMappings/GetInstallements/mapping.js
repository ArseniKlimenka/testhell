'use strict';

module.exports = function fetchMapping(input, sinkExchange) {

    const endowmentBody = input.body;
    const contractNumber = endowmentBody.mainAttributes.contract?.number;

    if (!contractNumber) {

        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    contractNo: contractNumber
                }
            }
        }
    };
};
