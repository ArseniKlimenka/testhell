'use strict';

module.exports = function mapping({input, sinkExchange, additionalDataSources}) {

    return { contractNumber: sinkExchange.contractNumber };
};
