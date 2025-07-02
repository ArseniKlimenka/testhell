'use strict';

const { setManualRateCommission, cleanManualRateCommission } = require('@config-rgsl/life-insurance/lib/productConfigurationUtils');

module.exports = function applyData(input, dataSourceResponse) {

    const body = this?.businessContext?.rootData;
    const productConfiguration = body?.productConfiguration;
    const mf = productConfiguration.mf;

    const firstWorkingDateAfterCoolOffPeriod = dataSourceResponse.firstWorkingDateAfterCoolOffPeriod;
    const firstWorkingDateAfterNumOfWorkDaysToInvest = dataSourceResponse.firstWorkingDateAfterNumOfWorkDaysToInvest;

    const investmentStartDate = firstWorkingDateAfterCoolOffPeriod;
    const investmentEndDate = firstWorkingDateAfterNumOfWorkDaysToInvest;

    body.additionalInvestmentParameters.investmentStartDate = investmentStartDate;
    body.additionalInvestmentParameters.investmentEndDate = investmentEndDate;
    body.additionalInvestmentParameters.mf = mf;

    const rateOfReturnRulesEquityActives = dataSourceResponse.rateOfReturnRulesEquityActives;
    const rateOfReturnEquityActives = dataSourceResponse.rateOfReturnEquityActives;
    const commWithdrawalFundsArray = dataSourceResponse.commWithdrawalFundsArray;

    cleanManualRateCommission(body);

    if (rateOfReturnRulesEquityActives?.length > 0 && rateOfReturnEquityActives) {

        if (!rateOfReturnEquityActives?.isStandardContractConditions) {
            setManualRateCommission(body, rateOfReturnEquityActives?.manualRate);
        }

        body.additionalInvestmentParameters.commWithdrawalFundsArray = commWithdrawalFundsArray;
        body.additionalInvestmentParameters.rateOfReturnEquityActives = rateOfReturnEquityActives;
    }

};
