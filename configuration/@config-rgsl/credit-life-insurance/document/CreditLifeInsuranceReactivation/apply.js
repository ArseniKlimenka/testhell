const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function apply(policyDocument, amendmentDocument) {

    const changedPolicyDocument = JSON.parse(JSON.stringify(policyDocument));

    // set amendment data
    changedPolicyDocument.amendmentData = JSON.parse(JSON.stringify(amendmentDocument));

    if (changedPolicyDocument.amendmentData.contractVersions)
    { changedPolicyDocument.amendmentData.contractVersions = []; }

    return changedPolicyDocument;

};
