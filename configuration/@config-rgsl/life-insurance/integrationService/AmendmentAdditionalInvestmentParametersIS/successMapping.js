'use strict';

module.exports = function mapping({ input, sinkExchange, additionalDataSources }) {

    return {
        workDay5: sinkExchange.workDay5
    };

};
