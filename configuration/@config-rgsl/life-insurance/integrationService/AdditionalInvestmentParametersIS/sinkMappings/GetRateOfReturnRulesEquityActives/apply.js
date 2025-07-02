'use strict';

const { commWithdrawalFundsToArray } = require('@config-rgsl/life-insurance/lib/investmentParametersHelper');

module.exports = function apply(sinkResult, sinkInput, sinkExchange) {

    const investmentManualRate = sinkExchange.investmentManualRate;
    const rateOfReturnRulesEquityActives = sinkResult.data?.map(data => data.resultData) ?? [];
    sinkExchange.rateOfReturnRulesEquityActives = rateOfReturnRulesEquityActives;

    if (investmentManualRate) {

        const rateOfReturnEquityActivesFiltered = rateOfReturnRulesEquityActives.filter(i => i.manualRate == investmentManualRate);
        const rateOfReturnEquityActives = rateOfReturnEquityActivesFiltered[0] ?? {};
        const commWithdrawalFunds = rateOfReturnEquityActives?.commWithdrawalFunds ?? {};
        const commWithdrawalFundsArray = commWithdrawalFundsToArray(commWithdrawalFunds);

        sinkExchange.rateOfReturnEquityActives = rateOfReturnEquityActives;
        sinkExchange.commWithdrawalFundsArray = commWithdrawalFundsArray;
    }
};
