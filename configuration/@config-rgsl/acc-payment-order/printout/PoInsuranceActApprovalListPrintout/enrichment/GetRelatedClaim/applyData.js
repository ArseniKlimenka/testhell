'use strict';

module.exports = function mapping(input, dataSourceResponse) {

    if (dataSourceResponse.data && dataSourceResponse.data.length > 0) {

        const claimRecord = dataSourceResponse.data[0].resultData;
        input.claimAmount = claimRecord.paymentAmountInDocCurrency;
        input.legalConclusion = claimRecord.approvalConclusions.legalConclusion;
        input.securityConclusion = claimRecord.approvalConclusions.securityConclusion;
    }
};

