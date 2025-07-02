"use strict";

const { deepCopy } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

function getPortfolioMovementApplyResult(policyDocument, amendmentDocument) {

    const paymentPlan = deepCopy(policyDocument.paymentPlan);
    amendmentDocument.paymentPlan = paymentPlan;

    const commission = deepCopy(policyDocument.commission);
    amendmentDocument.oldCommission = commission;

    const appliedResult = deepCopy(amendmentDocument);
    const amendmentSurrenderValues = deepCopy(amendmentDocument.surrenderValues ?? []);
    const amendmentPaymentPlan = deepCopy(amendmentDocument.paymentPlan ?? []);

    appliedResult.paymentPlan = amendmentPaymentPlan;
    appliedResult.surrenderValues = amendmentSurrenderValues;

    return appliedResult;
}

module.exports = {
    getPortfolioMovementApplyResult
};
