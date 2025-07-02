'use strict';

module.exports = function mapping({ input, sinkExchange, additionalDataSources }) {

    const mf = sinkExchange.mf;
    const insurerShareExpensesByYear = sinkExchange.insurerShareExpensesByYear;
    const netAssetsAmount = sinkExchange.netAssetsAmount;
    const freeMoney = sinkExchange.freeMoney;

    return {
        mf,
        insurerShareExpensesByYear,
        netAssetsAmount,
        freeMoney
    };

};
