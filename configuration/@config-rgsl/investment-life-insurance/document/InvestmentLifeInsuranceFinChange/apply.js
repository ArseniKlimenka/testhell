const { getFinAmendmentApplyResult } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentHelper');

module.exports = function apply(policyDocument, amendmentDocument) {

    const applyResult = getFinAmendmentApplyResult(policyDocument, amendmentDocument, this.businessContext);
    return applyResult;
};
