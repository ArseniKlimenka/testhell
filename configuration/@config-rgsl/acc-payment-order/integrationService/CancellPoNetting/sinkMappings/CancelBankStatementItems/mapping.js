'use strict';

module.exports = function mapping(input, sinkExchange) {

    const bankStatementItemIds = sinkExchange.bankStatementItemIds;

    return {
        request: {
            BankStatementItemIds: bankStatementItemIds
        }
    };
};
