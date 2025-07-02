'use strict';

module.exports = function mapping(input, sinkExchange) {

    return {
        input: {
            data: {
                criteria: {
                    refDocumentNo: sinkExchange.contractNumber
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };
};
