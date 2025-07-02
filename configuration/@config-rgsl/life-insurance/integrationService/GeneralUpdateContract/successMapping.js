'use strict';

module.exports = function mapping({input, sinkExchange, additionalDataSources}) {

    const successResponse = {
        code: 'OK',
        message: `Job was done!`
    };

    return successResponse;
};
