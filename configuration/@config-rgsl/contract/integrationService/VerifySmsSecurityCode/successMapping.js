'use strict';

module.exports = function mapping({input, sinkExchange, additionalDataSources}) {

    const state = sinkExchange.resolveContext('state');

    const successResponse = {
        verificationState: state
    };

    return successResponse;
};
