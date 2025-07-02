'use strict';

module.exports = function mapping({ input, sinkExchange, additionalDataSources }) {
    return {
        coef: sinkExchange.coef ?? 0,
        surrenderValue: sinkExchange.surrenderValue ?? 0,
        netAssetsAmount: sinkExchange.netAssetsAmount ?? 0,
        riskPremium: sinkExchange.riskPremium ?? 0,
        fundStatus: sinkExchange.fundStatus
    };

};
