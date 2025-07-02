const policyChangeAmendmentHelper = require('@config-rgsl/life-insurance/lib/policyChangeAmendmentHelper');

module.exports = function mapping(initialDocument) {

    const updatedDocument = Object.assign({}, initialDocument);
    updatedDocument.amendmentData = policyChangeAmendmentHelper.getDefaultAmendmentDataForPolicy(initialDocument);
    // Modify initial amendment data here.

    return { body: updatedDocument };
};
