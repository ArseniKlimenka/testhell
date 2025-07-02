'use strict';

module.exports = function mapping({input, sinkExchange, additionalDataSources}) {

    const enrichedBody = sinkExchange.enrichedBody;

    return {
        enrichedBody
    };
};
