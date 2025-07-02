'use strict';

module.exports = function mapping({input, sinkExchange, additionalDataSources}) {

    return {
        policyParties: sinkExchange.policyParties,
        partiesInfo: sinkExchange.partiesInfo
    };
};
