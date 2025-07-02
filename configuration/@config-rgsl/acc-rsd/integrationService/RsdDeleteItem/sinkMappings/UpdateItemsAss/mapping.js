'use strict';

module.exports = function mapping(sinkInput, sinkExchange) {

    return {
        request: {
            tableUpdates: [
                {
                    tableName: 'ACC_IMPL.RSD_ITEM_SAT',
                    setCondition: 'IS_DELETED = 1',
                    hkeys: sinkInput.hkeys,
                }
            ]
        }
    };
};
