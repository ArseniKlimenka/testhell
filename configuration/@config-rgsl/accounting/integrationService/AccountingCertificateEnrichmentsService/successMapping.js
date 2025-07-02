'use strict';

module.exports = function mapping({input, sinkExchange, additionalDataSources}) {

    const enrichedBody = sinkExchange.body;

    return {
        enrichedBody
    };
};
