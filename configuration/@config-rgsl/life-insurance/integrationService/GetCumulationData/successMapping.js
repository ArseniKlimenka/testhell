'use strict';

module.exports = function mapping({input, sinkExchange, additionalDataSources}) {

    return {
        cumulation: sinkExchange.cumulation
    };
};
