'use strict';

module.exports = function ({input, sinkExchange, additionalDataSources}) {
    const importedCount = sinkExchange.resolveContext('importedCount');
    const failedItems = sinkExchange.resolveContext('failedItems');

    const successResponse = {
        code: 'OK',
        message: 'Import finished!',
        importedCount,
        failedItems,
    };

    return successResponse;
};
