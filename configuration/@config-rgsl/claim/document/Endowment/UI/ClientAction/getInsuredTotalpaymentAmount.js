'use strict';

const { calculateTotalEndowmentAmount } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');

module.exports = function getInsuredTotalpaymentAmount(input) {

    const calculatedTotalAmount = calculateTotalEndowmentAmount(input.rootContext.Body);

    return {
        totalAmount: calculatedTotalAmount.amountInContractCurrency,
        totalAmountInRub: calculatedTotalAmount.amountInRubCurrency
    };
};
