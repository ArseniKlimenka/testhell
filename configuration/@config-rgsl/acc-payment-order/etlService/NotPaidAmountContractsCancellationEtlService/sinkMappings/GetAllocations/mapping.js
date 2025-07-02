'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    const contractNumber = sinkInput.contractNumber;

    return {
        input: {
            data: {
                criteria: {
                    refDocumentNo: contractNumber
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };
};
