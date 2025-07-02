'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    return {
        request: {
            tableUpdates: [
                {
                    tableName: 'ACC_IMPL.PORTFOLIO_TRANSFER_ITEM_SAT',
                    setCondition: 'IS_DELETED = 1',
                    hkeys: sinkInput.hkeys,
                }
            ]
        }
    };
};
