'use strict';

module.exports = function ({input, sinkExchange, additionalDataSources}) {
    const actItems = sinkExchange.resolveContext('actItems');
    const actItemPcs = sinkExchange.resolveContext('actItemPcs');

    const successResponse = {
        code: 'OK',
        message: 'Autopopulation finished!',
        itemsAdded: actItems.length,
        pcsAdded: actItemPcs.length,
    };

    return successResponse;
};
