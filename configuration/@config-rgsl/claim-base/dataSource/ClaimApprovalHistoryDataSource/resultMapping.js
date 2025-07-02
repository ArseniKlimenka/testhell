'use strict';

const DateTimeUtils = require('@config-rgsl/infrastructure/lib/DateTimeUtils');
const { translationUtils } = require('@adinsure/runtime');

module.exports = function resultMapping(input) {

    const output = {};
    const approvalGroupName = input.APPROVED_BY_GROUP === 'claimFirstLine' ? 'claims' : input.APPROVED_BY_GROUP;

    output.approvedBy = input.APPROVED_BY;
    output.approvedOnDate = input.APPROVED_ON ? DateTimeUtils.formatDate(input.APPROVED_ON) : undefined;
    output.approvedOnDateTime = input.APPROVED_ON;
    output.approvalGroupCode = input.APPROVED_BY_GROUP;
    output.approvalGroupName = approvalGroupName ? translationUtils.getTranslation('masterEntity/ApplicationUserGroup/1', 'localized-field', 'name', approvalGroupName) : '';
    output.oldStateCode = input.OLD_STATE;
    output.newStateCode = input.NEW_STATE;
    output.transitionName = input.TRANSITION;

    return output;
};
