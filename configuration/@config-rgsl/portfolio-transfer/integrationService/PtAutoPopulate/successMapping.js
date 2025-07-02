'use strict';

module.exports = function ({input, sinkExchange, additionalDataSources}) {

    const ptItems = sinkExchange.resolveContext('ptItems');

    const successResponse = {
        code: 'OK',
        message: 'Autopopulation finished!',
        newCount: ptItems.length,
    };

    return successResponse;
};
