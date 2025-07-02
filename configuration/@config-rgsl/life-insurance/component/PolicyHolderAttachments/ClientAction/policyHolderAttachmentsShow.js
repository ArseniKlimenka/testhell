const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function policyHolderAttachmentsShow(input, ambientProperties) {

    const partyCode = getValue(input, 'context.Body.policyHolder.partyData.partyCode');

    if (partyCode)
    { return true; }
    return false;

};
