'use strict';

module.exports = function mapping(lineInput, sinkExchange) {

    const contractNumber = sinkExchange.paymentOrderContractNumber;

    if (!contractNumber) {

        return undefined;
    }

    return {
        input: {
            data: {
                criteria: {
                    contractNumber: contractNumber,
                    includePersons: false
                }
            }
        }
    };
};
