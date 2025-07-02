const { getPortfolioMovementApplyResult } = require('@config-rgsl/life-insurance/lib/policyPortfolioMovementHelper');

module.exports = function apply(policyDocument, amendmentDocument) {

    const applyResult = getPortfolioMovementApplyResult(policyDocument, amendmentDocument, this.businessContext);
    return applyResult;
};
