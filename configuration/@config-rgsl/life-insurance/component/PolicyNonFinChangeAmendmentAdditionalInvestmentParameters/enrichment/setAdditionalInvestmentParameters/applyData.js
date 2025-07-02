'use strict';

module.exports = function applyData(input, dataSourceResponse) {

    const body = this?.businessContext?.rootData;
    body.amendmentData.nonFinChangeAmendmentData.additionalInvestmentParameters.investmentEndDate = dataSourceResponse.workDay5;

};
