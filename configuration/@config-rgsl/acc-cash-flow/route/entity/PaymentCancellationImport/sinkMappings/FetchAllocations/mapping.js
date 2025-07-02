'use strict';

module.exports = function mapping(input, sinkExchange) {

    const items = sinkExchange.resolveContext('items');
    const bsiIds = items.map(_ => _.data.bankStatementItemId);

    return {
        input: {
            data: {
                criteria: {
                    bankStatementItemIds: bsiIds,
                }
            }
        }
    };
};
