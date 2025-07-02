'use strict';

module.exports = function mapping(lineInput, sinkExchange) {

    const additionalData = JSON.parse(lineInput.additionalData);
    const contractNumber = additionalData.contractNumber;

    const output = {
        input: {
            data: {
                criteria: {
                    number: contractNumber,
                    isStrictNumber: true
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };

    sinkExchange.additionalData = additionalData;

    return output;
};
