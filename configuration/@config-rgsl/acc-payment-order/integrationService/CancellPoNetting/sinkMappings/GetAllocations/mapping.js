'use strict';

module.exports = function mapping(input, sinkExchange) {

    const bankStatementItemIds = sinkExchange.bankStatementItemIds;

    return {
        input: {
            data: {
                criteria: {
                    bankStatementItemIds: bankStatementItemIds,
                    isNotCancelled: true
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };
};
