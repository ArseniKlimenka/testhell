const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function policyHolderAttachmentsOnCreateViewParams(input, ambientProperties) {

    const partyCode = getValue(input, 'context.Body.policyHolder.partyData.partyCode');

    return { 'master-entity-code': partyCode };

};
