'use strict';

module.exports = function mapping({ input, sinkExchange, additionalDataSources }) {
    const successResponse = {
        code: 'OK',
        message: `Job was done!`,
        validationErrors: sinkExchange.resolveContext('validationErrors'),
        createdPolicyNumber: sinkExchange.resolveContext('createdPolicyNumber'),
        configurationName: sinkExchange.resolveContext('configurationName'),
        hasTransitioned: sinkExchange.resolveContext('hasTransitioned')
    };

    return successResponse;
};
