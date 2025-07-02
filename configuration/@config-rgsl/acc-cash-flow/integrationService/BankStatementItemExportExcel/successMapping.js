'use strict';

module.exports = function ({input, sinkExchange, additionalDataSources}) {
    const fileId = sinkExchange.resolveContext("fileId");

    const successResponse = {
        code: 'OK',
        message: `Report was generated.`,
        fileId: fileId,
    };

    return successResponse;
};
