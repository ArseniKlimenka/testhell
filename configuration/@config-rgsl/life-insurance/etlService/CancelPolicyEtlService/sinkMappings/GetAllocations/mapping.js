'use strict';

module.exports = function mapping(input, sinkExchange) {

    if (!sinkExchange.canCreateCancellation) {

        return null;
    }

    return {
        input: {
            data: {
                criteria: {
                    refDocumentNo: input.contractNumber
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };
};
