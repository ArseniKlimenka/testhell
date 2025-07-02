'use strict';

module.exports = function mapping(lineInput, sinkExchange) {

    const contractNumber = sinkExchange.additionalData.contractNumber;

    return {
        input: {
            data: {
                criteria: {
                    refDocumentNo: contractNumber
                }
            }
        }
    };
};
