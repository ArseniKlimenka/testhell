const { getNonFinAmendmentApplyResult } = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentHelper');

module.exports = function apply(policyDocument, amendmentDocument) {

    const applyResult = getNonFinAmendmentApplyResult(policyDocument, amendmentDocument);
    return applyResult;
};
