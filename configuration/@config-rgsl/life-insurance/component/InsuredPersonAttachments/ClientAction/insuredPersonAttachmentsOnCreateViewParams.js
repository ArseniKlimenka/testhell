const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function insuredPersonAttachmentsOnCreateViewParams(input, ambientProperties) {

    const partyCode = getValue(input, 'context.Body.insuredPerson.partyData.partyCode');

    return { 'master-entity-code': partyCode };

};
