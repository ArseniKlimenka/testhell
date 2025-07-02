'use strict';

module.exports = function mapping(input, sinkExchange) {

    const bsi = sinkExchange.resolveContext('bsi');

    if (!bsi) {

        return;
    }

    return {
        input: {
            data: {
                criteria: {
                    bankStatementItemId: bsi.bankStatementItemId,
                }
            },
            paging: {
                page: 0,
                pageSize: 15
            }
        }
    };
};
