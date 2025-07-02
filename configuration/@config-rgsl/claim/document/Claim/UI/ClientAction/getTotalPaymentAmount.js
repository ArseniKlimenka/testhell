'use strict';

const { calculateTotalClaimAmount } = require('@config-rgsl/claim-base/lib/claimGeneralHelper');

module.exports = function getTotalPaymentAmount(input) {

    const calculatedTotalAmount = calculateTotalClaimAmount(input.rootContext.Body);

    return {
        totalAmount: calculatedTotalAmount.amountInContractCurrency,
        totalAmountInRub: calculatedTotalAmount.amountInRubCurrency
    };
};
