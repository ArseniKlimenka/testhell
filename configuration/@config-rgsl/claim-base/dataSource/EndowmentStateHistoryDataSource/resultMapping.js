'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const output = {};
    const newState = input.NEW_STATE;

    output.stateCode = newState;

    output.state = newState ? translationUtils.getTranslation(`document/${input.DOCUMENT_TYPE}/1`, 'states', null, newState) : '';
    output.transition = input.TRANSITION ? input.TRANSITION : '';
    output.changedByUser = input.CHANGED_BY_USER ? input.CHANGED_BY_USER : '';
    output.changedByParty = input.CHANGED_BY_PARTY ? input.CHANGED_BY_PARTY : '';
    output.changedByPartyCode = input.CHANGED_BY_PARTY_CODE ? input.CHANGED_BY_PARTY_CODE : '';
    output.documentNumber = input.DOCUMENT_NUMBER ? input.DOCUMENT_NUMBER : '';
    output.validFrom = input.CHANGED_ON ? DateTimeUtils.formatDate(input.CHANGED_ON) : undefined;
    output.validFromWithTime = DateTimeUtils.formatDate(input.CHANGED_ON, 'yyyy-MM-dd HH:mm:ss');

    return output;
};
