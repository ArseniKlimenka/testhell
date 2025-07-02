'use strict';

module.exports = function resultMapping(input) {

    const selectUniquePartyCodes = this.businessContext.data.criteria.selectUniquePartyCodes;

    const output = {};

    output.id = input.ID;
    output.partyCode = input.PARTY_CODE;
    output.deduplNumber = input.DEDUPL_NUMBER;
    output.updateOrder = input.UPDATE_ORDER;
    output.isProcessed = input.IS_PROCESSED;
    if (!selectUniquePartyCodes) {
        output.updatedDocuments = input.UPDATED_DOCUMENTS ?
            JSON.parse(input.UPDATED_DOCUMENTS).filter(i => i.NUMBER) : [];
    }
    output.error = input.ERROR;
    output.date = input.DATE;
    output.partyFullName = input.PARTY_FULL_NAME ? input.PARTY_FULL_NAME : 'Контрагент не существует';

    return output;

};
