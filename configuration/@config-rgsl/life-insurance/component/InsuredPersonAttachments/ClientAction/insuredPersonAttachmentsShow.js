const { getValue } = require('@config-rgsl/infrastructure/lib/ObjectUtils');

module.exports = function insuredPersonAttachmentsShow(input, ambientProperties) {

    const partyCode = getValue(input, 'context.Body.insuredPerson.partyData.partyCode');
    const isPolicyHolder = getValue(input, 'context.Body.insuredPerson.isPolicyHolder');

    if (partyCode && !isPolicyHolder)
    { return true; }
    return false;

};
